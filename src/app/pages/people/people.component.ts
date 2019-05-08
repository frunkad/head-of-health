import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  everyone: Observable<User[]>;
  user: User;
  followings: string[];

  constructor(private auth: AuthService, private db: DatabaseService) {
    this.followings = [];
    this.auth.user$.subscribe(user => {
      if (user == null) {
        this.user = null;
      } else {
        this.user = user;
        const followings = this.db.getFollowings(user['uid']).subscribe(val => {
          val.forEach(t => this.followings.push(t['to']));
        });
      }
    });
  }
  ngOnInit() {
    this.everyone = this.db.getEveryone();
  }

  follow(uid: string) {
    console.log(this.user);
    return this.db.setFollow(this.user['uid'], uid);
  }

  doesFollow(uid: string): boolean {
    return this.followings.includes(uid);
  }

  log(uid: string) {
    alert(this.doesFollow(uid));
  }

}
