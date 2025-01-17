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
  shouldShow = true;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => {
      if (user == null) {
        this.user = false;
      } else {
        this.user = user;

      }
    });
    // console.log(this.shouldShow, this.router.url);
    this.router.events.subscribe(obs => {
      console.log('a', obs['url']);
      if (obs['url'] === '/home' || obs['url'] === '' || obs['url'] === '/' || obs['url'] === '/login' || obs['url'] === 'login' || obs['url'] === 'home') {
        this.shouldShow = false;
      } else if (obs['url']) {
        this.shouldShow = true;
      }
      return obs;
    });

  }

  logout() {
    return this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}
