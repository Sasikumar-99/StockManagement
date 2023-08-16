import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import{io, Socket} from 'socket.io-client'
import { Store } from '@ngrx/store';
import { AssignCurrentUSer, setAllUsers } from './chat-states/chat_actions';
import { Observable, map } from 'rxjs';
import { LoginPanelService } from '../login-panel/login-panel.service';
@Injectable({
  providedIn: 'root'
})
export class ChatAppService {
  socket!:Socket
  userDetails:any
  userMap : any
  usersArray : any
  user : any
  recentChatMap:any

  constructor(private _http:HttpClient,private store:Store,private _loginService: LoginPanelService) {
  }

  connectToSocket(){
    this.socket = io(environment.baseUrl)
    this.user = this._loginService.getLocalStorage('user');
    return this.socket
  }

  getAllUsers(){
      this._http.get(`${environment.baseUrl}getAllUser`).subscribe({
        next: (users:any)=>{
          this.usersArray = users.body;
          this.userMap = {}
          users.body.forEach((user: any) =>{
            this.userMap[user.userName] = {
              id: user._id,
              userName: user.userName,
              chatDetailsID: user.chatId
            }
          })
          this.store.dispatch(setAllUsers({users: this.userMap}));
          this.store.dispatch(AssignCurrentUSer({user: this.userMap[this.user.userName]}));
          this.getUserDetails();
        }
      })
  }

  getUserDetails(){
    this.store.subscribe({
      next: (state:any)=>{
        this.userDetails = {
          current: state.chatApp.user,
          chattingTo: state.chatApp.currentlyChattingTo,
          backUrl: state.chatApp.chatRoute
        }
      }
    })
  }

  getRecentChats(){
    this.socket.emit('recentChats',this.userDetails.current);
    this.socket.on('recentChatDetails',(recentChat) => {
        const obj: any = {};
       this.usersArray.forEach((value:any) => {
          obj[value._id] = value;
        })
        this.recentChatMap = recentChat.map((id:string)=>{
          return obj[id];
        })
    })
  }
}
