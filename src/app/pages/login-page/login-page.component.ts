import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    return this.auth.signInWithGoogle().then(() => {
      this.router.navigate(['/', 'feed']);
    });
  }
  loginWithFacebook() {
    return this.auth.signInWithFacebook().then(() => {
      this.router.navigate(['/', 'feed']);
    });
  }
  loginWithTwitter() {
    return this.auth.signInWithTwitter().then(() => {
      this.router.navigate(['/', 'feed']);
    });
  }

}
