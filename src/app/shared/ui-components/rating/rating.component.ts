import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
    @Input() rating: number;
    @Input() viewOnly: boolean;
    @Output() ratingChange = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {}

    public onClick(rating: number): void {
        this.rating = rating;
        this.ratingChange.emit(rating);
    }
}
