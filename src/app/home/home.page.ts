import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPanelService } from './login-panel/login-panel.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  navigation!:FormControl
  productsPanelEnable:Boolean = false
  constructor(private _loginService:LoginPanelService,public _router:Router) {
    this.navigation= new FormControl('productDisplay')
  }

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

  // onRadioChange(event:any){
  //     console.log(this.navigation.value);
  //     if(this.navigation.value =='home'){
  //       this._router.navigate(['home/productDisplay'])
  //     }else{
  //       this._router.navigate(['home/chatApp'])
  //     }
  // }

  navigateTo(componentName:string){
    this._router.navigate([`home/${componentName}`])
  }
}
