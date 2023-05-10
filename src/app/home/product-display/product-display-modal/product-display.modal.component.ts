import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavParams } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
import { ToastrService } from "ngx-toastr";
import { LoginPanelService } from "../../login-panel/login-panel.service";
import { ProductService } from "../product.service";

@Component({
  selector : 'app-product-display-modal',
  templateUrl : 'product-display.modal.component.html',
  styleUrls : ['product-display.modal.component.css']
})

export class ProductDisplayModal implements AfterViewInit,OnInit {
  productsAdd!:FormGroup
  Editproducts:boolean
  user:any
  data : any
  constructor(private _productService:ProductService,private modalCtrl: ModalController,
    private _toaster:ToastrService,
    private navParams: NavParams,
    private loginService:LoginPanelService){
    this.productsAdd = new FormGroup({
      productName : new FormControl('',Validators.required),
      sellingPrice : new FormControl('',Validators.required),
      receivedPrice : new FormControl('',Validators.required),
      category : new FormControl('',Validators.required),
      quantity : new FormControl('',[Validators.required,Validators.min(0)]),
    })
    this.Editproducts = false
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
  get category(){
    return this.productsAdd.get('category')
  }
  get quantity(){
    return this.productsAdd.get('quantity')
  }

  ngOnInit(): void {
    this.user = this.loginService.getLocalStorage('user')

  }
  ngAfterViewInit(): void {
    this.data =  this.navParams.get('data')
      if(this.data){
        this.Editproducts=true
      }else{
        this.Editproducts=false
      }
      if(this.Editproducts){
        this.productsAdd.patchValue(this.data.products);
      }
  }

  productsSubmit(){
    this.user = this.loginService.getLocalStorage('user')
    if(this.Editproducts){
      this._productService.updateProduct(this.user.productsId,this.data.productItemIndex,this.productsAdd.value).subscribe((value:any)=>{
        if(!value.error){
          this._toaster.success(value.message);
          this._productService.emitSubject(true);
        }else{
          this._toaster.error(value.message)
        }
      },(rej)=>{
        if(rej){
          this._toaster.error(rej.error.message)
        }
      })
    }else{
      this._productService.getProducts(this.user.productsId).subscribe((value:any) => {
        if(!value.error){
          const existingProductName = value.body.products.find((products:any) => products.productName.toLowerCase() === this.productName?.value.toLowerCase());
          if(!existingProductName){
            value.body.products.push(this.productsAdd.value)
            this._productService.addProducts(value.body.products,this.user).subscribe((value:any) =>{
                if(value.error){
                    this._toaster.error(value.message)
                  }else{
                    this._toaster.success(value.message)
                  }
                },(rej)=>{
                  this._toaster.error(rej.error.message)
                })
          }else{
            this._toaster.error('product already exists')
          }
        }
      },(rej)=>{
        if(rej){
          this._toaster.error(rej.error.message)
        }
      })
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
