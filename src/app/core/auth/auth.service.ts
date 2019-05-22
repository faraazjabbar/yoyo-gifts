import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public emitUserData = new BehaviorSubject(null);
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.emitUserData.next(JSON.parse(localStorage.getItem('user')));
  }

  public googleSignInWithPopup() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public signInWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public createUserWithEmail(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public signOut() {
    return this.afAuth.auth.signOut();
  }

  public addNewUser(user: User) {
    return this.http.post(
      environment.firebaseConfig.databaseURL + '/users.json',
      user
    );
  }

  public getUser(email) {
    return this.http.get(
      environment.firebaseConfig.databaseURL +
        '/users.json?orderBy="email"&equalTo="' +
        email +
        '"'
    );
  }
}
