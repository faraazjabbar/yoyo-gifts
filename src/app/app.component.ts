import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreSelectors, GiftStoreActions } from 'src/app/root-store';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'yoyo-gifts';

    constructor(
      private store: Store<RootStoreState.State>,
      private router: Router
  ) { }

    ngOnInit() {


        // NGRX for gift lists ...
        // this.store.select(GiftStoreSelectors.getList)
        //     .pipe(
        //         tap(gifts => console.log('From GetList Selector::: ', gifts))
        //     )
        //     .subscribe();
        // // this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));

        // NGRX for gift ...
        // this.store.select(GiftStoreSelectors.getByKey('-LfIigQjjdKusws13mRo'))
        //     .pipe(
        //         tap(gift => console.log('From GetByKey Selector::: ', gift))
        //     )
        //     .subscribe();
        // this.store.dispatch(new GiftStoreActions.GetGiftRequestAction({key: '-LfIigQjjdKusws13mRo'}));
    }

}
