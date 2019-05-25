import { Gift } from 'src/app/shared/models/gift.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gift-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() gifts: Observable<Gift>;
  @Input() heading: string;
  constructor() { }

  ngOnInit() {
  }

}
