import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoAccessComponent } from './no-access.component';

describe('NoAccessComponent', () => {
    let component: NoAccessComponent;
    let fixture: ComponentFixture<NoAccessComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [NoAccessComponent]
        });
        fixture = TestBed.createComponent(NoAccessComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
});
