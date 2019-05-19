import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  constructor(private afAuth: AngularFireAuth) {}

  public signInWithPopup() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public signInWithEmail(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
