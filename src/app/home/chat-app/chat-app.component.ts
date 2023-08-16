import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatAppService } from './chat-app.service';
import { ConnectedUser } from './chat-interface';
import { Store } from '@ngrx/store';
import { AssignCurrentUSer, hideNavbar, resetState, setAllUsers } from './chat-states/chat_actions';
import { LoginPanelService } from '../login-panel/login-panel.service';
import { selectIsHideNav } from './chat-states/chat_selectors';
@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.scss'],
})
export class ChatAppComponent implements OnInit, OnDestroy {
  user:any
  $hideNavbar!:Observable<any>;
  constructor(private router:Router,
    private _chatService:ChatAppService,
    private _loginService: LoginPanelService,
    private _router: Router,
    private store: Store ) { }

  ngOnInit() {
    this.$hideNavbar = this.store.select(selectIsHideNav);
    this._chatService.connectToSocket();
    this._chatService.getAllUsers();
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetState());
  }
}
