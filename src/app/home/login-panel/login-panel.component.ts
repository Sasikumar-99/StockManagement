import { Component, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginPanelService } from './login-panel.service';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
@Component({
  selector: 'app-login-panel',
  templateUrl: 'login-panel.component.html',
  styleUrls: ['login-panel.component.css'],
})
export class LoginPanelComponent {
  loginForm !:FormGroup;
  @Output()isLoginSuccess = new EventEmitter();
  @HostListener('window:keydown', ['$event']) onkeyDown(event: KeyboardEvent) {
    if( event?.key === 'Enter' ) {
      this.onLogin();
    }
  };

  constructor (private _loginService : LoginPanelService, private _toaster: ToastrService ){
    this.loginForm = new FormGroup({
      userName : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      Islogin : new FormControl(true),
      IsRegister : new FormControl(false)
    })
  }


  get userName(){
    return this.loginForm.get('userName')
  }

  get password(){
    return this.loginForm.get('password')
  }
  get isLogin():FormControl{
    return this.loginForm.get('Islogin')?.value
  }
  get isRegister(){
    return this.loginForm.get('IsRegister')?.value
  }


  onLogin(){
    this._loginService.showLoading();
    this._loginService.userManagement(this.loginForm.value).subscribe( async (value:any)=>{
      if(!value.error){
        this._loginService.dismissLoading();
        this._toaster.success(value.message)
        this.isLoginSuccess.emit(true);
        this._loginService.setLocalStorage('user',value.body)
      }else{
        this._loginService.dismissLoading();
        this._toaster.error(value.message)
      }
    },async (rej)=>{
      this._loginService.dismissLoading();
      this._toaster.error(rej.error.message);
    })
  }

  resetFormField(){
    this.loginForm.get('userName')?.reset()
    this.loginForm.get('password')?.reset()
  }
}
