import { Component } from '@angular/core';
import { LoginPanelService } from './login-panel/login-panel.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  productsPanelEnable:Boolean = false
  constructor(private _loginService:LoginPanelService) {}

  loginSuccess(event:any){
    this.productsPanelEnable = event
  }

  logOut(){
    const user =this._loginService.getLocalStorage('user')
    if(user){
      this._loginService.clearLocalStorage('user')
      this.productsPanelEnable=false;
    }
  }
}
