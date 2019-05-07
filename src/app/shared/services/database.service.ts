import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

interface Realtionship {
  by: string;
  to: string;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getUserFromUID(uid: string): Observable<User> | [null] {
    if (uid === '' || uid === null ) {
      return [null];
    }
    return this.db.object<User>(`users/${uid}`).valueChanges();
  }

  updateUser(user: User): void | Promise<void> {
    if (user['uid'] === '' || user['uid'] === null) {
      return;
    }
    return this.db.object<User>(`users/${user['uid']}`).update(user);
  }

  getAllPostsByUser(uid: string): Observable<Post[]> {
    return this.db.list<Post>(`posts`, ref => ref.orderByChild('uid').equalTo(uid)).valueChanges();
  }

  getAllPosts(): Observable<Post[]> {
    return this.db.list<Post>(`posts`, ref => ref.orderByChild('timestamp')).valueChanges();
  }

  createPost(post: Post) {
    if (!post.pid) {
      post.pid = this.db.createPushId();
    }
    return this.db.object<Post>(`posts/${post.pid}`).set(post);
  }

  getEveryone(): Observable<User[]> {
    return this.db.list<User>(`users`).valueChanges();
  }

  setFollow(by: string, to: string) {
    if (by === to) {
      return alert('You can"t follow yourself');
    }
    return this.db.list('relationships').push(
      {
        by: by,
        to: to
      }
    );
  }

  getFollowings(u: string): Observable<{}[]> {
    return this.db.list<Realtionship>(`relationships`, ref => ref.orderByChild('by').equalTo(u)).valueChanges();
  }
}
