import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'head-of-health';

  user: User | boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => {
      if (user == null) {
        this.user = false;
      } else {
        this.user = user;

      }
    });
  }

  logout() {
    return this.auth.signOut().then(() => this.router.navigate(['/', 'login']));
  }
}
