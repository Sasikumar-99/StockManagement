import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _platform: Platform) { }

  get isDesktop(): boolean {
    return this._platform.is('desktop');
  }

  async presentToast() {
  }
}
