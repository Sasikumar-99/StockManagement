import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUsers } from '../chat-states/chat_selectors';
import { ChatAppService } from '../chat-app.service';
import { LoginPanelService } from '../../login-panel/login-panel.service';
import { setChatUser } from '../chat-states/chat_actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  loggedUser$!: Observable<any>;
  userDetails:any
  constructor(public store: Store,
    public _chatService:ChatAppService,
    private _loginService: LoginPanelService,
    private _router: Router){}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(selectUsers);
    this._chatService.getUserDetails();
    if(this._chatService.userDetails.current !== null){
          this._chatService.getRecentChats();
    }
  }

  onContactClick(user: any) {
    this.store.dispatch(setChatUser({ user: user.userName,route : this._router.url,navbar:true}));
  }
}
