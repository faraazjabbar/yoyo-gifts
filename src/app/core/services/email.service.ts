import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { AlertService } from './alert.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(private alertService: AlertService) { }

    send(model, templateParams, callBack: Function) {

        const serviceId = environment.email.serviceId;
        const templateId = environment.email.templateId;
        const userId = environment.email.userId;

        emailjs
            .send(serviceId, templateId, templateParams, userId)
            .then(response => {
                if(response.status === 200) {
                    callBack();
                }
            }, err => {
                this.alertService.error(err);
            });
    }
}
