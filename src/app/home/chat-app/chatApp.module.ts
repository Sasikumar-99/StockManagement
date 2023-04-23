import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { ChatAppComponent } from "./chat-app.component";
import {ChatAppRoutingModule} from './chatApp-routing.module'
import { CommonModule } from '@angular/common';
import { ChatsComponent } from "./chats/chats.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations:[ContactsComponent,ChatsComponent,ChatAppComponent, ChatMessageComponent],
  imports:[IonicModule,ChatAppRoutingModule,CommonModule,MatTableModule]
})

export class ChatApp{

}
