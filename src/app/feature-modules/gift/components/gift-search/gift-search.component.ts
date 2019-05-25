import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gift-search',
  templateUrl: './gift-search.component.html',
  styleUrls: ['./gift-search.component.scss']
})
export class GiftSearchComponent implements OnInit {
  searchValue: string;
  @Output() searchValueEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  emitSearchValue() {
    console.log(this.searchValue);
    this.searchValueEvent.emit(this.searchValue);
  }
}
