import { SpinnerService } from './../../../../core/spinner/spinner.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { tap, map, switchMap } from 'rxjs/operators';
import { Subscription, Observable, of, forkJoin } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { ActivatedRoute } from '@angular/router';
import * as emailjs from 'emailjs-com';
import {
  Order,
  SentGift,
  RecievedGift
} from 'src/app/shared/models/orders.model';
import { OrdersService } from 'src/app/feature-modules/user/services/orders.service';
import { User } from './../../../../shared/models/user.model';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.component.html',
  styleUrls: ['./gift-details.component.scss']
})
export class GiftDetailsComponent implements OnInit, OnDestroy {
  public user: User;

  private subscriptions: Subscription[] = [];
  public isSendGift = false;
  translation$: Observable<Object>;
  gift$: Observable<Gift>;
  gift: Gift;
  giftMessage: string;

  model: any = {
    name: '',
    email: '',
    messege: ''
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    // this.alertService.confirm('Want to delete?', 'xxxx', null);
    // this.alertService.confirm(
    //     this.confirmTitle,
    //     this.confirmText,
    //     () => this.yesCallBack(),
    //     () => this.noCallBack(),
    //     this.confirmBtnText,
    //     this.cancelBtnText
    // );
    // this.alertService.error('Something went wrong');
    // this.alertService.warning('Key is not Unique');

    this.user = JSON.parse(localStorage.getItem('user'));

    // Accessing gift data from resolver route guard ...
    this.spinnerService.show();
    this.route.data.subscribe((data: { gift: Gift }) => {
      this.gift = data.gift;
      this.spinnerService.hide();
    });

    // this.gift$ = this.store.select(GiftStoreSelectors.getByKey('-LfIigQjjdKusws13mRo'));
    // this.gift$
    //     .pipe(
    //         tap(gift => console.log('From GetByKey Selector DETAILS PAGE ::: ', gift))
    //     )
    //     .subscribe();

    // this.subscriptions.push(this.store.select(GiftStoreSelectors.getError)
    //     .pipe(
    //         tap(error => {
    //             if (error) {
    //                 this.alertService.error(error);
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

  /**
   * enableSendForm
   */
  public enableSendForm() {
    this.isSendGift = true;
  }

  onSubmit() {
    const templateParams = {
      toemail: this.model.email,
      toname: this.model.name,
      fromname: 'YoYo Gifts Group#1'
    };
    const emailJsServiceId = 'gmail';
    const emailJsTemplateId = 'template_Cg1kIF0Z';
    const emailJsUserId = 'user_1Vb8OYU8eOTkZpWt24PNf';
    emailjs
      .send(emailJsServiceId, emailJsTemplateId, templateParams, emailJsUserId)
      .then(
        response => {
          this.updateOrdersAndGift();
          console.log('SUCCESS!', response.status, response.text);
        },
        err => {
          console.log('FAILED...', err);
        }
      );
  }

  cancelSendGift() {
    this.isSendGift = false;
    // this.giftMessage = 'Gift NOT Sent Successfully !!!';
  }

  private updateOrdersAndGift() {
    let senderOrder: Order;
    let recieverOrder: Order;
    let updateSenderOrderApi;
    let updateRecieverOrderApi;

    const sentGift: SentGift = {
      recieverName: this.model.name,
      revieverEmail: this.model.email,
      sentOn: new Date().toDateString(),
      ...this.gift
    };

    const recievedGift: RecievedGift = {
      senderEmail: this.user.email,
      senderName: this.user.userName,
      senderImage: this.user.imageLink,
      recievedOn: new Date().toDateString(),
      isRedeemed: false,
      isReviewed: false,
      ...this.gift
    };

    const recieverOrderApi = this.orderService.getOrders(this.model.email);
    const senderOderApi = this.orderService.getOrders(this.user.email);

    forkJoin([senderOderApi, recieverOrderApi])
      .pipe(
        tap(data => console.log('Form Join data: ', data)),
        switchMap(data => {
          if (data[0].key) {
            senderOrder = data[0];
          } else {
            senderOrder = {
              email: this.user.email,
              sent: [],
              recieved: []
            };
          }

          if (!senderOrder.sent) {
            senderOrder['sent'] = [];
          }
          senderOrder.sent.push(sentGift);
          if (data[1].key) {
            recieverOrder = data[1];
          } else {
            recieverOrder = {
              email: this.model.email,
              sent: [],
              recieved: []
            };
          }
          if (!recieverOrder.recieved) {
            recieverOrder['recieved'] = [];
          }

          recieverOrder.recieved.push(recievedGift);

          if (data[0].key) {
            updateSenderOrderApi = this.orderService.updateOrder(senderOrder);
          } else {
            updateSenderOrderApi = this.orderService.addNewOrder(senderOrder);
          }
          if (data[1].key) {
            updateRecieverOrderApi = this.orderService.updateOrder(
              recieverOrder
            );
          } else {
            updateRecieverOrderApi = this.orderService.addNewOrder(
              recieverOrder
            );
          }

          this.gift.count++;

          const updateGiftApi = this.orderService.updateGift(
            JSON.parse(JSON.stringify(this.gift))
          );
          forkJoin([
            updateSenderOrderApi,
            updateRecieverOrderApi,
            updateGiftApi
          ]).subscribe(
            res => {
              console.log(res);
              this.isSendGift = false;
              this.alertService.success('Sent', 'Gift sent successfully.');
            },
            err => {
              this.alertService.error('Failed to send gift.');
            }
          );
          return data;
        })
      )
      .subscribe();
  }
}
