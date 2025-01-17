import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  posts: Post[];
  user: User;
  followings: string[];
  mobs: Observable<Post[]>;

  constructor(private auth: AuthService, private db: DatabaseService) {
    const observer = [];
    this.posts = [];
    this.auth.user$.subscribe(user => {
      if (user == null) {
        this.user = null;
      } else {
        this.user = user;
        console.log('g');
        const followings = this.db.getFollowings(this.user.uid);
        followings.subscribe(val => {
          val.forEach(t => {
            console.log(t);
            // this.followings.push(t['to']);
            this.db.getAllPostsByUser(t['to']).subscribe(p => {
              console.log(p);
              p.forEach(pp => {
                this.posts.push(pp);
              });
            });
          });
        });
      }
    });
    console.log(this.posts);
  }


  ngOnInit() {
    // posts = this.db.get
    // this.posts = this.db.getAllPosts();
  }

}
