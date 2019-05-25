import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private fbService: FirebaseService) {}

    getUsers(): Observable<User[]> {
        return this.fbService.get<User>('/users');
    }

    getUserByKey(key: string): Observable<User> {
        return this.fbService.getByKey('/users', key);
    }

    updateUser(user: User) {
        return this.fbService.update('/users', JSON.parse(JSON.stringify(user)));
    }
}
