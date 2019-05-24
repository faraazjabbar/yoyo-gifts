import { SpinnerModel } from './spinner.model';
import { SpinnerService } from './spinner.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.subscription = this.spinnerService.spinnerState
        .subscribe((state: SpinnerModel) => {
            this.show = state.show;
        });
}
ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
