import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPanelService } from './home/login-panel/login-panel.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _loginService:LoginPanelService,private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._loginService.getLocalStorage('user')){
        return true;
      }else{
        this._router.navigate(['/login'])
        return false;
      }
  }

}
