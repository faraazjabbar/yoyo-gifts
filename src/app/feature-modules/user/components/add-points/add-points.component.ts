import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from './../../../../core/services/alert.service';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from './../../../../core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-points',
    templateUrl: './add-points.component.html',
    styleUrls: ['./add-points.component.scss']
})
export class AddPointsComponent implements OnInit, OnDestroy {
    public content: User;
    public points;
    private userSubscription: Subscription;
    constructor(
        public modalRef: MDBModalRef,
        private alertservice: AlertService,
        private userService: UserService,
        private authService: AuthService
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }

    public setPoints() {
        const user: User = JSON.parse(JSON.stringify(this.content));
        user.points += this.points;
        this.userSubscription = this.userService.updateUser(user).subscribe(
            data => {
                console.log(data);
                this.alertservice.success(
                    'success',
                    'Added points successfully'
                );
                this.content.points += this.points;
                localStorage.setItem('user', JSON.stringify(user));
                this.authService.emitUserData.next(user);

                this.modalRef.hide();
            },
            err => {
                this.alertservice.error(err);
            }
        );
    }
}
