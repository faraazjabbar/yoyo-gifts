import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerModel } from './spinner.model';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private SpinnerSubject = new Subject<SpinnerModel>();
  spinnerState = this.SpinnerSubject.asObservable();
  constructor() { }
  show() {
          this.SpinnerSubject.next(<SpinnerModel>{show: true});
      }
  hide() {
          this.SpinnerSubject.next(<SpinnerModel>{show: false});
      }
}
