import { Injectable } from '@angular/core';
import swal, {SweetAlertResult} from 'sweetalert2';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { TranslationService } from 'src/app/core/services/translation.service';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private confirmBtnText: string;
    private cancelBtnText: string;
    private successBtnText: string;
    private select: string;

    constructor(
        private translationService: TranslationService
    ) {
        this.confirmBtnText = new TranslatePipe(this.translationService).transform('yes');
        this.cancelBtnText = new TranslatePipe(this.translationService).transform('no');
        this.successBtnText = new TranslatePipe(this.translationService).transform('ok');
        this.select = new TranslatePipe(this.translationService).transform('select');
    }

    private alertResult(result: SweetAlertResult, yesCallback: Function, noCallback: Function) {
        if (result.value) {
            yesCallback(result.value);
        } else {
            if (noCallback) {
                noCallback();
            }
        }
    }

    confirm(title: string, text: string, yesCallback: Function, noCallback?: Function, confirmBtnText: string = this.confirmBtnText,
        cancelBtnText: string = this.cancelBtnText) {
        swal.fire({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn',
            title: title,
            text: text,
            type: 'warning',
            showCancelButton: true,
            // tslint:disable-next-line:max-line-length
            confirmButtonText: '<fa-icon class="ng-fa-icon"><svg aria-hidden="true" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg></fa-icon> ' + confirmBtnText,
            // tslint:disable-next-line:max-line-length
            cancelButtonText: '<fa-icon class="ng-fa-icon"><svg aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></fa-icon> ' + cancelBtnText
        }).then(result => this.alertResult(result, yesCallback, noCallback));
    }

    error(error: string) {
        swal.fire({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn',
            title: 'Error',
            text: error,
            type: 'error'
        });
    }

    warning(warning: string) {
        swal.fire({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn',
            title: 'Warning',
            text: warning,
            type: 'warning'
        });
    }

    success(title: string, text: string, btn1Text: string = this.successBtnText, btn1Callback?: Function,
      btn2Text?: string, btn2Callback?: Function) {
        swal.fire({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn',
            title: title,
            text: text,
            type: 'success',
            showCancelButton: !!btn2Text,
            confirmButtonText: btn1Text,
            cancelButtonText: btn2Text
        }).then(result => {
            if (result.value) {
                if (btn1Callback) {
                    btn1Callback();
                }
            } else {
                if (btn2Callback) {
                    btn2Callback();
                }
            }
        });
    }
}
