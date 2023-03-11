import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginPanelService } from '../login-panel/login-panel.service';
import { ProductService } from '../product-display/product.service';


@Component({
  selector: 'app-otp',
  templateUrl: 'otp.modal.component.html',
  styleUrls: ['otp.modal.component.css'],
})

export class OtpModal{
  private _secretKey:any = []
  constructor(private _loginService:LoginPanelService,private _toaster:ToastrService,private _productService:ProductService){}

  onOtpChange(ev:any){
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
    const user = this._loginService.getLocalStorage('user');
    this._loginService.setSecretKey(user._id,this._secretKey).subscribe((value:any)=>{
      if(value.error){
        this._toaster.error(value.message)
      }else{
        this._loginService.setLocalStorage('user',value.body)
        this._toaster.success(value.message)
      }
    },(rej)=>{
      this._toaster.error(rej.error.message)
    })
  }
}
