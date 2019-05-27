import { TestBed } from '@angular/core/testing';
import { EmailService } from './email.service';

describe('EmailService', () => {
    let service: EmailService;
    beforeEach(() => {
        TestBed.configureTestingModule({providers: [EmailService] });
        service = TestBed.get(EmailService);
    });

    it('can load instance', () => {
        expect(service).toBeTruthy();
    });
});
