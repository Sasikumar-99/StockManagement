import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class LoginPanelService{

  constructor(private _http:HttpClient){}
  private _domain = 'http://localhost:3000/'

  userManagement(data:any){
    return this._http.post(`${this._domain}login`,data)
  }

  setLocalStorage(key:string,data:any){
    const strigify = JSON.stringify(data);
    sessionStorage.setItem(key,strigify);
  }

  getLocalStorage(key:string){
    const userExist = sessionStorage.getItem(key);
    if(userExist){
      return JSON.parse(userExist);
    }else{
      return 'value does not exist with the provided key';
    }
  }
}
