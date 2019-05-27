import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GiftReviewComponent } from './gift-review.component';

describe('GiftReviewComponent', () => {
    let component: GiftReviewComponent;
    let fixture: ComponentFixture<GiftReviewComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [GiftReviewComponent]
        });
        fixture = TestBed.createComponent(GiftReviewComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
});
