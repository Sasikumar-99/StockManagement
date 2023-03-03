import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector : 'app-product-display-modal',
  templateUrl : 'product-display.modal.component.html',
  styleUrls : ['product-display.modal.component.css']
})

export class ProductDisplayModal {
  productsAdd!:FormGroup

  constructor(private matdialog:MatDialog){
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
    console.log(this.productsAdd.value)
  }
}
