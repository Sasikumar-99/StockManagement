import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { LoginPanelService } from '../../login-panel/login-panel.service';
import { ChatAppService } from '../chat-app.service';
import { Store } from '@ngrx/store';
import { setChatUser } from '../chat-states/chat_actions';
import { selectUsers } from '../chat-states/chat_selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  users:any;
  loggedUser$!: Observable<any>;
  constructor(
    private _chatService: ChatAppService,
    private _loginService: LoginPanelService,
    private _toaster: ToastrService,
    private _router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(selectUsers);
    this.users = this._chatService.usersArray;

  }
  onContactClick(user: any) {
    this.store.dispatch(setChatUser({ user: user.userName,route : this._router.url,navbar:true}));
  }
}
