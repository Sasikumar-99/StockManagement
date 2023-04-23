import { ChatAppService } from './../chat-app.service';
import { io } from 'socket.io-client';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { LoginPanelService } from '../../login-panel/login-panel.service';
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  appearedUser:any
  loggedInUser:any
  messageData : any
  constructor(private location:Location,private _chatAppService:ChatAppService,private _loginService:LoginPanelService){
  }
  ngOnInit(): void {
    this.loggedInUser = this._loginService.getLocalStorage('user')
    const state:any = this.location.getState()
    this.appearedUser = state.userData
    const selectedUser = {
      loggedInUser : this.loggedInUser,
      onChatUser : this.appearedUser
    }
    this._chatAppService.socket.emit('chatting-users',selectedUser)
    this._chatAppService.socket.on('notification',(connectedData)=>{
      console.log(connectedData);
    })
  }
  onSend(message:any){
    const chatData = {
      from  : this.loggedInUser,
      to : this.appearedUser,
      message: message,
      time :Date.now().toString()
    }
    this._chatAppService.socket.emit('message',chatData)
    this._chatAppService.socket.on('notification',(connectedData)=>{
      if(!connectedData.error){
        this.messageData = connectedData.body
        console.log(this.messageData);
      }
    })
  }
}
