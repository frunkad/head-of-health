import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { DatabaseService } from '../../services/database.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  displayName;
  constructor(private db: DatabaseService) {

  }

  ngOnInit() {
    console.log(this.post);
    this.displayName = this.db.getUsername(this.post.uid);
  }

  getUserInfo(uid: string) {
    console.log(uid);
    return this.db.getUsername(uid);
  }

}
