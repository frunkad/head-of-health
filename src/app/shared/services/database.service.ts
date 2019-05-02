import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getUserFromUID(uid: string): Observable<User> | [null] {
    if (uid === '' || uid === null ) {
      return [null];
    }
    return this.db.object<User>(`users/${uid}`).valueChanges();
  }
}
