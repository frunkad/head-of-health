import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-anon',
  templateUrl: './anon.component.html',
  styleUrls: ['./anon.component.scss']
})
export class AnonComponent implements OnInit {
  posts;

  constructor(private db: DatabaseService) {
    this.posts = this.db.getAllPostsByUser('anonymous');
  }

  ngOnInit() {
  }

}
