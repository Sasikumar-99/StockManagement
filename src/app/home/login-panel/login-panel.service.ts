import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class LoginPanelService{

  constructor(private _http:HttpClient){}
  private _domain = 'http://localhost:3000/'
  userManagement(data:any){
    return this._http.post(`${this._domain}login`,data)
  }
}
