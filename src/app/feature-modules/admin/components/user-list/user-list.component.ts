import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import { RootStoreState, UserStoreSelectors, UserStoreActions } from 'src/app/root-store';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    private subscriptions: Subscription[] = [];

    users$: Observable<User[]>;

    constructor(
        private store: Store<RootStoreState.State>,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.users$ = this.store.select(UserStoreSelectors.getList);
        this.users$.pipe(tap(users => console.log('Store users, ', users))).subscribe();
        // Pushing obsersavation to unscribe it
        this.subscriptions.push(
            this.store.select(UserStoreSelectors.getError)
                .pipe(
                    filter(error => error !== null),
                    tap(error => this.alertService.error(error))
                )
                .subscribe()
        );
        // Dispatching Gift Store Actions ...
        this.store.dispatch(new UserStoreActions.GetUsersRequestAction({}));
    }

}
