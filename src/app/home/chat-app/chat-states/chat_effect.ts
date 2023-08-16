import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setChatUser } from './chat_actions';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
 @Injectable()

 export class ChatEffect{
  constructor(private actions$: Actions,private _router: Router){}

  $setSelectedChatUser = createEffect(()=>{
   return this.actions$.pipe(ofType(setChatUser),tap((actions)=>{
      this._router.navigate(['home/chatApp/chatMessage'])
   }))
  },{dispatch:false})
 }
