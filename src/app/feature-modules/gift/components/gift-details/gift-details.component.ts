import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreActions, GiftStoreSelectors } from 'src/app/root-store';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable, of } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { ActivatedRoute } from '@angular/router';
import * as emailjs from 'emailjs-com';

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
  giftMessage: String;

  model: any = {
    name: '',
    email: '',
    messege: ''
  };

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

  onSubmit() {
      console.log('Submitted form: ', this.model);
      console.log('Selected Gift: ', this.gift);

      console.log('Start: emailjs-com');
      const templateParams = {
          toemail: this.model.email,
          toname: this.model.name,
          fromname: 'YoYo Gifts Group#1'
      };
      const emailJsServiceId = 'gmail';
      const emailJsTemplateId = 'template_Cg1kIF0Z';
      const emailJsUserId = 'user_1Vb8OYU8eOTkZpWt24PNf';
      emailjs.send(emailJsServiceId, emailJsTemplateId, templateParams, emailJsUserId)
          .then((response) => {
              console.log('SUCCESS!', response.status, response.text);
          }, (err) => {
              console.log('FAILED...', err);
          });
      console.log('End: emailjs-com');
      this.giftMessage = 'Gift Sent Successfully !!!';
  }

  cancelSendGift() {
    console.log('cancelled gift');
    this.giftMessage = 'Gift NOT Sent Successfully !!!';
  }

}
