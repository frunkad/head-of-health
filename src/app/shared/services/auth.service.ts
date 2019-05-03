import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { tap, map, take } from 'rxjs/operators';

import {User} from '../models/user.model';
import * as firebase from 'firebase/app';
import {FirebaseError} from 'firebase/app';
import { DatabaseService } from './database.service';

// import UserInfo = firebase.UserInfo;

@Injectable()
export class AuthService {
  public fbuser: firebase.User;
  public authState$: Observable<firebase.User>;
  public user$: Observable<User>;
  public user: User;

  constructor(private afAuth: AngularFireAuth, private db: DatabaseService, public router: Router) {
    this.fbuser = null;
    this.authState$ = afAuth.authState;

    this.user$ = this.authState$.pipe(
      switchMap(user => {
        this.fbuser = user;
        console.log('authState$ changed', this.fbuser);
        if (user !== null) {
          return db.getUserFromUID(user.uid);
        } else {
          return db.getUserFromUID(''); // TODO: This should return something like user
        }
      })
    );
    this.user$.subscribe(user => {
      if (user == null) {
        this.user = null;
        // this.user$.
      } else {
        this.user = user;
      }
      console.log('User: ', user);
    });
  }

  get authenticated(): boolean {
    return !!this.user;
  }

  get id(): string {
    return this.authenticated ? this.fbuser.uid : null;
  }

  signIn(provider: firebase.auth.AuthProvider): Promise<void> {
    return firebase.auth()
      .signInWithPopup(provider)
      .then((result: firebase.auth.UserCredential) => {
        // The signed-in user info.
        this.fbuser = result.user;
        const t_user = <User>{
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid
        };
        return this.db.updateUser(t_user);

        // this.db.updateUser(result.user);
      }).catch((error: FirebaseError) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'authService/account-exists-with-different-credential') {
          alert('You have signed up with a different provider for that email.');
          // Handle linking here if your app allows it.
        }
        console.error('ERROR @ AuthService#signIn() :', error);
      });
  }

  signInWithGoogle(): Promise<void> {
    return this.signIn(new firebase.auth.GoogleAuthProvider());
  }
  signInWithFacebook(): Promise<void> {
    return this.signIn(new firebase.auth.FacebookAuthProvider());
  }
  signInWithTwitter(): Promise<void> {
    return this.signIn(new firebase.auth.TwitterAuthProvider());
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}
