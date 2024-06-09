import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPanelService } from './login-panel/login-panel.service';
import { CommonService } from '../common.service';
import { ProductService } from './product-display/product.service';
import { MatDialog } from '@angular/material/dialog';
import { OtpModalComponent } from './otp-modal/otp.modal.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public menuGroup!:string
  navigation!:FormControl
  constructor( private _loginService: LoginPanelService,
    public _router: Router,
    private _commonService: CommonService,
    private _productService:ProductService,
    public dialog: MatDialog ) {
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

  secretKeyEnabled(){
    const dialogRef = this.dialog.open(OtpModalComponent)
    dialogRef.afterClosed().subscribe((result:any) => {
      this._loginService.dismissLoading();
      this._productService.emitSubject(true);
    });
}

get commonService(): CommonService {
    return this._commonService;
  }
}
