import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertService } from './../../../core/services/alert.service';
import { Gift } from 'src/app/shared/models/gift.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private fbService: FirebaseService,
        private authService: AuthService,
        private alertService: AlertService
    ) {}

    getUsers(): Observable<User[]> {
        return this.fbService.get<User>('/users');
    }

    getUserByKey(key: string): Observable<User> {
        return this.fbService.getByKey('/users', key);
    }

    updateUser(user: User) {
        return this.fbService.update(
            '/users',
            JSON.parse(JSON.stringify(user))
        );
    }

    public addToFavorites(user: User, gift: Gift) {
        let isExists = false;
        if (user.favoriteGifts && user.favoriteGifts.length) {
            isExists =
                user.favoriteGifts.findIndex(g => g.key === gift.key) > -1;
        }
        if (isExists) {
            this.alertService.warning('Gift already exist in your favorites.');
        } else {
            user['favoriteGifts'] = user.favoriteGifts || [];
            user.favoriteGifts.push(gift);
            const msg = 'Added to your favorites successfully.';

            this.updateUserAndSetInSession(user, msg);
        }
    }

    public removeFromFavorites(user: User, gift: Gift) {
        user.favoriteGifts.splice(
            user.favoriteGifts.findIndex(g => g.key === gift.key),
            1
        );
        const msg = 'Gift removed from your favorites successfully.';
        this.updateUserAndSetInSession(user, msg);
    }

    public updateUserAndSetInSession(user: User, msg: string) {
        this.updateUser(user).subscribe(
            () => {
                this.alertService.success('Success', msg);

                localStorage.setItem('user', JSON.stringify(user));
                this.authService.emitUserData.next(
                    JSON.parse(JSON.stringify(user))
                );
            },
            err => {
                this.alertService.error(err);
            }
        );
    }
}
