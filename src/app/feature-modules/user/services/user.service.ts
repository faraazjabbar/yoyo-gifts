import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private fbs: FirebaseService) {}

    public updateUser(user: User) {
        return this.fbs.update('/users', JSON.parse(JSON.stringify(user)));
    }
}
