import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{io, Socket} from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class ChatAppService {
  socket!:Socket
  constructor(private _http:HttpClient) { }

  connectToSocket(){
    this.socket = io(environment.baseUrl)
    return this.socket
  }

  getAllUsers(){
    return this._http.get(`${environment.baseUrl}getAllUser`)
  }
}
