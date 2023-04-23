import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChatAppService } from './chat-app.service';
@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.scss'],
})
export class ChatAppComponent implements OnInit {
  constructor(private router:Router,private _chatService:ChatAppService ) { }

  ngOnInit() {
    this._chatService.connectToSocket()
  }
}
