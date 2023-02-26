import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  productsPanelEnable:Boolean = false
  constructor() {}

  loginSuccess(event:any){
    this.productsPanelEnable = event
  }
}
