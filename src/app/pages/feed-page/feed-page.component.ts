import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    // posts = this.db.get
  }

}
