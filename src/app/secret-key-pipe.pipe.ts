import { Pipe, PipeTransform } from '@angular/core';
import { LoginPanelService } from './home/login-panel/login-panel.service';

@Pipe({
  name: 'secretKeyPipe'
})
export class SecretKeyPipePipe implements PipeTransform {

  constructor(private _loginService:LoginPanelService){
  }

  transform(value: any, ...args: any[]) {
    let newString = ''
    const user = this._loginService.getLocalStorage('user');
    let matchedValue:any = []
    const nativeEle = value.split('')
    if(user.secretKey.length===10){
      user.secretKey.forEach((value:any) => {
        nativeEle.forEach((element:any) => {
          if(value.value === parseInt(element)){
            matchedValue.push(value.key);
          }
        });
      });
    }else{
      matchedValue = nativeEle
    }
    return matchedValue.join('')
  }
}
