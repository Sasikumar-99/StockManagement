import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {

  public deleteClicked = new BehaviorSubject(false)
  constructor() { }

  isClicked(value:boolean){
    this.deleteClicked.next(value)
  }
}
