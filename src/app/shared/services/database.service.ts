import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

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

  createPost(post: Post) {
    if (!post.pid) {
      post.pid = this.db.createPushId();
    }
    return this.db.object<Post>(`posts/${post.pid}`).set(post);
  }
}
