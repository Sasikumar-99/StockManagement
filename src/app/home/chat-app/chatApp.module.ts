import { NgModule, isDevMode } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { ChatAppComponent } from "./chat-app.component";
import {ChatAppRoutingModule} from './chatApp-routing.module'
import { CommonModule } from '@angular/common';
import { ChatsComponent } from "./chats/chats.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {MatTableModule} from '@angular/material/table';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { chatReducer } from "./chat-states/chat_reducers";
import { ChatEffect } from "./chat-states/chat_effect";
import { ChatAppService } from "./chat-app.service";


@NgModule({
  declarations:[ContactsComponent,ChatsComponent,ChatAppComponent, ChatMessageComponent],
  imports:[IonicModule,
    ChatAppRoutingModule,
    CommonModule,
    MatTableModule,
    StoreModule.forFeature('chatApp', chatReducer),
    EffectsModule.forFeature([ChatEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
    ],
    providers:[ChatAppService]
})

export class ChatApp{

}
