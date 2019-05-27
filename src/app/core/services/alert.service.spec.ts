import { TestBed } from '@angular/core/testing';
import { TranslationService } from 'src/app/core/services/translation.service';
import { AlertService } from './alert.service';

describe('AlertService', () => {
    let service: AlertService;
    beforeEach(() => {
        const translationServiceStub = {};
        TestBed.configureTestingModule({
        providers: [
            AlertService,
            { provide: TranslationService, useValue: translationServiceStub }
        ]
        });
        service = TestBed.get(AlertService);
    });
    it('can load instance', () => {
        expect(service).toBeTruthy();
    });
});
