import { Component, OnInit } from '@angular/core';

import * as emailjs from 'emailjs-com';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'yoyo-gifts';

    ngOnInit() {
        // console.log('Start: emailjs-com');
        // const templateParams = {
        //     toemail: 'Samir.Adak@mindtree.com',
        //     toname: '<recipient name>',
        //     fromname: 'YoYo Gifts Group#1'
        // };
        // const emailJsServiceId = 'gmail';
        // const emailJsTemplateId = 'template_Cg1kIF0Z';
        // const emailJsUserId = 'user_1Vb8OYU8eOTkZpWt24PNf';

        // emailjs.send(emailJsServiceId, emailJsTemplateId, templateParams, emailJsUserId)
        //     .then((response) => {
        //         console.log('SUCCESS!', response.status, response.text);
        //     }, (err) => {
        //         console.log('FAILED...', err);
        //     });
        // console.log('End: emailjs-com');


    }

}
