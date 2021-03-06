import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { RouterLinks } from './../../shared/constants/app.constants';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        let res = true;
        const user: User = this.authService.emitUserData.getValue();

        if (state.url === RouterLinks.ADMIN) {
            user && user.isAdmin ? (res = true) : (res = false);
        }
        if (state.url === RouterLinks.USER) {
            user && user.isAdmin ? (res = false) : (res = true);
        }
        if (state.url === RouterLinks.USERLIST) {
            user && user.isAdmin ? (res = true) : (res = false);
        }
        if (state.url === RouterLinks.GIFTLIST) {
            user && user.isAdmin ? (res = true) : (res = false);
        }
        if (state.url === RouterLinks.ORDERS) {
            user ? (res = true) : (res = false);
        }
        if (state.url === RouterLinks.SIGN_IN && user) {
            res = false;
        }
        if (!res) {
            this.router.navigate([RouterLinks.NO_ACCESS]);
        }
        return res;
    }
}
