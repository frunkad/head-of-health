import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { User } from 'src/app/shared/models/user.model';
import { Post } from 'src/app/shared/models/post.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  posts: Observable<Post[]>;
  newPostContent = new FormControl('Yo');

  constructor(private auth: AuthService, private db: DatabaseService, private router: Router) {
    this.auth.user$.subscribe(user => {
      if (user == null) {
        this.user = null;
        this.router.navigate(['/', 'login']);
      } else {
        this.user = user;
        this.posts = db.getAllPostsByUser(this.user.uid);

      }
    });
  }

  post() {
    const p = <Post> {
      'pid': '',
      'textContent': this.newPostContent.value,
      'timestamp': (new Date()).getTime().toString(),
      'uid': this.user.uid
    };
    return this.db.createPost(p);
  }

  postA() {
    const p = <Post> {
      'pid': '',
      'textContent': this.newPostContent.value,
      'timestamp': (new Date()).getTime().toString(),
      'uid': 'anonymous'
    };
    return this.db.createPost(p);
  }

  ngOnInit() {
  }

}
