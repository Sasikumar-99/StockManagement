import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPanelService } from './login-panel/login-panel.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public menuGroup!:string
  navigation!:FormControl
  constructor(private _loginService:LoginPanelService,public _router:Router,private _activatedRoute:ActivatedRoute) {
    this.navigation= new FormControl()
  }
ngOnInit(): void {
  this.menuGroup = this._router.url

}
  logOut(){
    const user =this._loginService.getLocalStorage('user')
    if(user){
      this._loginService.clearLocalStorage('user')
      this._router.navigate(['login'])
    }
  }

  navigateValue(){
    this._router.navigate([`${this.menuGroup}`])
  }
}
