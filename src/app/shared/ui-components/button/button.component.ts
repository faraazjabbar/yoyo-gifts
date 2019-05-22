import { Component, OnInit, Input } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'yoyo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
