import {Component, Output} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginPanelService } from './login-panel.service';
import { AlertController } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-panel',
  templateUrl: 'login-panel.component.html',
  styleUrls: ['login-panel.component.css'],
})
export class LoginPanel {
  loginForm !:FormGroup;
  @Output()isLoginSuccess = new EventEmitter();

  constructor (private _loginService : LoginPanelService,private alertController:AlertController,private _toaster:ToastrService){
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
    this._loginService.userManagement(this.loginForm.value).subscribe( async (value:any)=>{
      if(!value.error){
            const alert =await this.alertController.create({
            header: 'Success',
            message: value.message,
            buttons: [
            {
              text : 'Ok',
              role : 'confirm',
              handler: ()=>{
                this.isLoginSuccess.emit(true)
              }
            }
            ],
          });
          await alert.present();
          this._loginService.setLocalStorage('user',value.body)
      }else{
        this._toaster.error(value.message)
      }
    },async (rej)=>{
      const alert =await this.alertController.create({
        header: 'Error',
        message: rej.error.message,
        buttons: ['OK'],
      });
      await alert.present();
    })
  }

  resetFormField(){
    this.loginForm.get('userName')?.reset()
    this.loginForm.get('password')?.reset()
  }
}
