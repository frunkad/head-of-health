import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'head-of-health';

  user: User;

  constructor(private auth: AuthService) {
    this.auth.user$.subscribe(user => {
      if (user == null) {
        this.user = null;
      } else {
        this.user = user;

      }
    });
  }

  logout() {
    return this.auth.signOut();
  }
}
