import { Component, OnInit } from '@angular/core';
import { LoginPanelService } from '../login-panel/login-panel.service';
import { ProductService } from '../product-display/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user:any
  products:any[]=[];
  colorDecider ={
    notAvailable:'danger',
    aboutToEnd:'warning',
    available:'success'
  }
  constructor(
    private _loginService: LoginPanelService,
    private _productService: ProductService,
    private _toaster:ToastrService
  ) {}
  ngOnInit(): void {
    this.user = this._loginService.getLocalStorage('user');
    this.getAllProducts(  )
  }
  getAllProducts() {
    this._productService.getProducts(this.user.productsId).subscribe(
      (value: any) => {
        if (!value.error) {
          this.products = value.body.products;
          console.log(this.products);
        } else {
          this._toaster.error(value.message);
        }
        this._loginService.dismissLoading();
      },
      (rej) => {
        if (rej) {
          this._loginService.dismissLoading();
          this._toaster.error(rej.error.message);
        }
        this._loginService.dismissLoading();
      }
    );
  }
  colorDecision(products:any,index:number){
    if(products.quantity <= 1){
      return this.colorDecider.notAvailable;
    }else if(products.quantity <= 5){
      return this.colorDecider.aboutToEnd;
    }else{
      return this.colorDecider.available;
    }
  }
}
