import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { LoginPanelService } from "../../login-panel/login-panel.service";
import { ProductService } from "../product.service";

@Component({
  selector : 'app-product-display-modal',
  templateUrl : 'product-display.modal.component.html',
  styleUrls : ['product-display.modal.component.css']
})

export class ProductDisplayModal {
  productsAdd!:FormGroup

  constructor(private matdialog:MatDialog,private _productService:ProductService,
    private _toaster:ToastrService,
    private loginService:LoginPanelService,
    @Inject(MAT_DIALOG_DATA) public data:any){
    this.productsAdd = new FormGroup({
      productName : new FormControl('',Validators.required),
      sellingPrice : new FormControl('',Validators.required),
      receivedPrice : new FormControl('',Validators.required),
      quantity : new FormControl('',Validators.required),
    })
  }

  get productName(){
    return this.productsAdd.get('productName')
  }
  get sellingPrice(){
    return this.productsAdd.get('sellingPrice')
  }
  get receivedPrice(){
    return this.productsAdd.get('receivedPrice')
  }
  get quantity(){
    return this.productsAdd.get('quantity')
  }

  productsSubmit(){
    const user = this.loginService.getLocalStorage('user')
    this._productService.getProducts(user.productsId).subscribe((value:any) => {
      if(!value.error){
        value.body.products.push(this.productsAdd.value)
        this._productService.addProducts(value.body.products,user).subscribe((value:any) =>{
            if(value.error){
                this._toaster.error(value.message)
              }else{
                this._toaster.success(value.message)
              }
            },(rej)=>{
              this._toaster.error(rej.error.message)
            })
      }
    },(rej)=>{
      if(rej){
        this._toaster.error(rej.error.message)
      }
    })
  }
}
