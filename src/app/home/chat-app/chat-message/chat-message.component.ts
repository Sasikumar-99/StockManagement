import { Observable, map } from 'rxjs';
import { ChatAppService } from './../chat-app.service';
import { io } from 'socket.io-client';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { LoginPanelService } from '../../login-panel/login-panel.service';
import { Store } from '@ngrx/store';
import { hideNavbar } from '../chat-states/chat_actions';
import { selectUserOnChat } from '../chat-states/chat_selectors';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  currentlyChattingTo$!:Observable<any>;
  backUrl !: string;
  userDetails !: any;
  userMessages !: any[]
  constructor(private _chatAppService:ChatAppService,
    private _loginService:LoginPanelService,
    private _router: Router,
    private store: Store){
  }
  ngOnInit(): void {
    this.currentlyChattingTo$ = this.store.select(selectUserOnChat);
    this.userDetails = this._chatAppService.userDetails;
    this._chatAppService.socket.emit('getParticularUserMessages',this._chatAppService.userDetails);
    this._chatAppService.socket.on('fetchedUserMessages',(userMessages) => {
      if(userMessages && userMessages.length>1){
        this.userMessages = userMessages.map((messages: any) => {
          const current = this._chatAppService.userDetails.current.ref
          return {
            createdAt: messages.createdAt,
            messageBody: messages.messageBody,
            read: messages.read,
            messageType: messages.messageType,
            slot: messages.from.ref === current ? 'start' : 'end'
          }
        });
      }else{
        this.userMessages = [];
      }
      console.log(this.userMessages);

    })
  }

  onSend(message:any){
    const messageStructure = {
      from: {
        Id: this.userDetails.current.id,
        chatId: this.userDetails.current.chatDetailsID,
        ref: this.userDetails.current.userName
      },
      to: {
        Id: this.userDetails.chattingTo.id,
        chatId: this.userDetails.chattingTo.chatDetailsID,
        ref: this.userDetails.chattingTo.userName
      },
      messageBody:message,
      messageType:'String',
      read:false,
      createdAt:this.currentDateAndTime(),
    };

    this._chatAppService.socket.emit('message',messageStructure);
  }

  backButton(){
    this._router.navigate([this.userDetails.backUrl]);
    this.store.dispatch(hideNavbar({hide:false}));
  }

  currentDateAndTime(){
      var d = new Date();
      var n = d.toLocaleString([], { hour12: true});
      return n
}
}
