import { ChatMessageComponent } from './chat-message/chat-message.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAppComponent } from './chat-app.component';
import { ChatsComponent } from './chats/chats.component';
import { ContactsComponent } from './contacts/contacts.component';
const routes: Routes = [
  {path:'',component:ChatAppComponent,children:[
    {path:'',redirectTo:'chats',pathMatch:'full'},
    {path:'chats',component:ChatsComponent},
    {path:'contacts',component:ContactsComponent},
    {path:'chatMessage',component:ChatMessageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatAppRoutingModule {}
