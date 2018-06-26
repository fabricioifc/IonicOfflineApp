import { Injectable } from '@angular/core';
import { Toast, ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {

  toast: Toast;
  constructor(public toastCtrl: ToastController) { }

  // Método padrão
  create(message, ok = false, duration = 2000, cssClass = '') {
    // if (this.toast) {
    //   this.toast.dismiss();
    // }

    this.toast = this.toastCtrl.create({
      message,
      duration: ok ? null : duration,
      position: 'bottom',
      showCloseButton: ok,
      closeButtonText: 'OK',
      cssClass: cssClass
    });
    this.toast.present();
  }

  // Customizado para mostrar quando for mensagem de erro
  createError(message, cssClass = 'toast-error') {
    this.create(message, false, 2000, cssClass);
  }
  
}