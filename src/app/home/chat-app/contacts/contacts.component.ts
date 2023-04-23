import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { LoginPanelService } from '../../login-panel/login-panel.service';
import { ChatAppService } from '../chat-app.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
users:any
constructor(private _chatService:ChatAppService,private _loginService:LoginPanelService,private _toaster:ToastrService,private _router:Router ){}
ngOnInit(): void {

  this.getUsers()
}

getUsers(){
  this._chatService.getAllUsers().subscribe((value:any) => {
    if(!value.error){
      this.users =  value.body;
      this._loginService.dismissLoading();
    }else{
      this._loginService.dismissLoading();
      this._toaster.error(value.message)
    }
  },(rej)=>{
    if(rej){
      this._loginService.dismissLoading();
      this._toaster.error(rej.error.message)
    }
  })
}


onContactClick(user:any){
this._router.navigate(['home/chatApp/chatMessage'],{state:{userData:user}})
}

}
