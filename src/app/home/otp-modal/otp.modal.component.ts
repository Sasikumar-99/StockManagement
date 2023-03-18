import { Component, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginPanelService } from '../login-panel/login-panel.service';
import { ProductService } from '../product-display/product.service';


@Component({
  selector: 'app-otp',
  templateUrl: 'otp.modal.component.html',
  styleUrls: ['otp.modal.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class OtpModal{
   _secretKey:any = []
  constructor(private _loginService:LoginPanelService,private _toaster:ToastrService,private _productService:ProductService){}

  onOtpChange(ev:any){
    this._secretKey = [];
    if(ev.length === 10){
      for(let i=0;i<ev.length;i++){
        this._secretKey.push({
          key:ev[i].toUpperCase(),
          value:i+1,
          index:i
        })
      }
      this._secretKey[9].value = 0;
    }else{
      this._secretKey = []
    }
  }

  saveSecretKey(){
    this._loginService.showLoading();
    const user = this._loginService.getLocalStorage('user');
    this._loginService.setSecretKey(user._id,this._secretKey).subscribe((value:any)=>{
      if(value.error){
        this._loginService.dismissLoading();
        this._toaster.error(value.message);
      }else{
        this._loginService.dismissLoading();
        this._loginService.setLocalStorage('user',value.body)
        this._toaster.success(value.message);
      }
    },(rej)=>{
      this._loginService.dismissLoading();
      this._toaster.error(rej.error.message)
    })
  }
}
