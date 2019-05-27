import { Router } from '@angular/router';
import { AlertService } from './../../../../core/services/alert.service';
import { Gift } from './../../../../shared/models/gift.model';
import { AdminGiftService } from './../../services/admin-gift.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreSelectors, GiftStoreActions, UserStoreSelectors, UserStoreActions } from 'src/app/root-store';
import { Subscription, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
  gifts$: Observable<Gift[]>;
  users$: Observable<User[]>;
  users;
  totalFavCount = 0;
    giftsList = true;
    usersList = false;

  constructor(
    private adminGiftService: AdminGiftService,
    private store: Store<RootStoreState.State>,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.gifts$ = this.store.select(GiftStoreSelectors.getList);
    // Pushing obsersavation to unscribe it
    this.subscriptions.push(
        this.store.select(GiftStoreSelectors.getLoading)
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
        this.store.select(GiftStoreSelectors.getError)
            .pipe(
                filter(error => error !== null),
                tap(error => this.alertService.error(error))
            )
            .subscribe()
    );
    // Dispatching Gift Store Actions ...
    this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));
    this.store.select(UserStoreSelectors.getList)
    .subscribe( data => {
        this.users = data;
        this.users.forEach(user => {
            if (user.favoriteGifts) {
                this.totalFavCount += user.favoriteGifts.length;
            }
        });
    });
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
    this.store.dispatch(new UserStoreActions.GetUsersRequestAction({}));
}
    toggleLists(listName: string) {
        if (listName === 'gifts') {
            this.giftsList = !this.giftsList;
            this.usersList = false;
        }
        if (listName === 'users') {
            this.usersList = !this.usersList;
            this.giftsList = false;
        }
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
