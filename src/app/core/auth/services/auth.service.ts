import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  public googleSignInWithPopup() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public signInWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
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
