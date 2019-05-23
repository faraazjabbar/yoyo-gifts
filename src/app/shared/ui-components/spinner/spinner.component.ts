import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs';
import { LoaderState } from '../../models/spinner.model';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  content = 'Loading...';
  private subscription: Subscription;
  show = false;
  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.subscription = this.spinnerService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
