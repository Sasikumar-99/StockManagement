import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoadingController } from "@ionic/angular";
import { MatDialog } from "@angular/material/dialog";
import { Spinner } from "../spinner/spinnet.component";
@Injectable()
export class LoginPanelService{

  constructor(private _http:HttpClient,private loading:LoadingController,private dialog:MatDialog){}
  private _domain = environment.baseUrl
  private _loading:any

  userManagement(data:any){
    return this._http.post(`${this._domain}login`,data)
  }

  setLocalStorage(key:string,data:any){
    const strigify = JSON.stringify(data);
    sessionStorage.setItem(key,strigify);
  }

  clearLocalStorage(value:any){
    sessionStorage.removeItem(value)
  }

  getLocalStorage(key:string){
    const userExist = sessionStorage.getItem(key);
    if(userExist){
      return JSON.parse(userExist);
    }else{
      return 'value does not exist with the provided key';
    }
  }

  setSecretKey(id:string,body:any){
    return this._http.put(`${this._domain}updateUser/${id}`,body)
  }

  async showLoading() {
    this._loading = this.dialog.open(Spinner)
  }
  async dismissLoading(){
    await this._loading.close();
  }
}
