import { AfterViewInit, Directive,ElementRef,HostListener, OnInit } from '@angular/core';
import { LoginPanelService } from './home/login-panel/login-panel.service';

@Directive({
  selector: '[appSecretKey]'
})
export class SecretKeyDirective implements AfterViewInit{
  user:any
  constructor(private el:ElementRef,private _loginService:LoginPanelService) {
   }
   ngAfterViewInit(): void {
    this.user = this._loginService.getLocalStorage('user');
    this.setReceivedKey()
   }

   setReceivedKey(){
    let matchedValue:any = []
    const nativeEle = this.el.nativeElement.innerText.split('')
    if(this.user.secretKey.length){
      this.user.secretKey.forEach((value:any) => {
        nativeEle.forEach((element:any) => {
          if(value.value === parseInt(element)){
            matchedValue.push(value.key);
          }
        });
      });
    }else{
      matchedValue = nativeEle
    }
    this.el.nativeElement.innerText = matchedValue.join('')
   }
}
