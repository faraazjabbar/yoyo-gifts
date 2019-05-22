import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreActions, GiftStoreSelectors } from 'src/app/root-store';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable, of } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.component.html',
  styleUrls: ['./gift-details.component.scss']
})
export class GiftDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  translation$: Observable<Object>;
  gift$: Observable<Gift>;
  gift: Gift;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RootStoreState.State>
  ) { }

  ngOnInit() {

      // this.gift$ = this.store.select(GiftStoreSelectors.getByKey('-LfIigQjjdKusws13mRo'));
      this.route.data.subscribe((data: { gift: Gift }) => {
        console.log('gift: ', data.gift);
        this.gift = data.gift;
      });

      // console.log('RESOLVER GUARD GIFT: ', this.gift);

      // this.gift$
      //     .pipe(
      //         tap(gift => console.log('From GetByKey Selector DETAILS PAGE ::: ', gift))
      //     )
      //     .subscribe();

      // this.subscriptions.push(this.store.select(GiftStoreSelectors.getError)
      //     .pipe(
      //         tap(error => {
      //             if (error) {
      //                 // this.alertService.error(error);
      //                 console.log('something went wrong');
      //             }
      //         })
      //     )
      //     .subscribe());

      // // Dispatching Gift Store Actions ...
      // this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));
      // this.store.dispatch(new GiftStoreActions.GetGiftRequestAction({key: giftKey}));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(x => {
          if (x) {
              x.unsubscribe();
          }
      });
  }

}
