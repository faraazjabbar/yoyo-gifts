import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreSelectors, UserStoreActions } from 'src/app/root-store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class AdminUserListComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    users$: Observable<User[]>;

    constructor(
        private store: Store<RootStoreState.State>,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private router: Router
    ) { }

    ngOnInit() {
        this.users$ = this.store.select(UserStoreSelectors.getList);
        // Pushing obsersavation to unscribe it
        this.subscriptions.push(
            this.store.select(UserStoreSelectors.getLoading)
                .pipe(
                    tap(value => {
                        if (value) {
                            this.spinnerService.show();
                        } else {
                            this.spinnerService.hide();
                        }
                    })
                )
                .subscribe()
        );
        this.subscriptions.push(
            this.store.select(UserStoreSelectors.getError)
                .pipe(
                    filter(error => error !== null),
                    tap(error => this.alertService.error(error))
                )
                .subscribe()
        );
        // Dispatching Gift Store Actions ...
        // this.store.dispatch(new UserStoreActions.GetUsersRequestAction({}));
    }

    gotoUserProfile(userKey) {
        this.alertService.warning('TODO : Not yet inplemented');
    }

    blockUser(userKey) {
        this.alertService.warning('TODO : Not yet inplemented');
    }

    ngOnDestroy() {
        // Unscribing all the subscriptions at one go ...
        this.subscriptions.forEach(eachSubcription => {
            if (eachSubcription) {
                eachSubcription.unsubscribe();
            }
        });
    }

}
