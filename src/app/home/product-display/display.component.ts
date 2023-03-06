import { AfterViewInit, Component, ViewChild } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ProductService } from "./product.service";
import { LoginPanelService } from "../login-panel/login-panel.service";
import { ToastrService } from "ngx-toastr";

export interface UserData {
  productName: string;
  sellingPrice: string;
  receivedPrice: string;
  quantity: number;
  _id:string
}

@Component({
  selector : 'app-display',
  templateUrl : 'display.component.html',
  styleUrls : ['display.component.css']
})

export class ProductDisplay implements AfterViewInit {
  displayedColumns: string[] = ['productName', 'sellingPrice', 'receivedPrice', 'quantity','edit','delete'];
  displayColumnsHeader : string[] = ['Product Name','Selling Price', 'Received Price','quantity', 'Edit', 'Delete']
  dataSource !: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   user:any
   tableDisplay:any
  constructor (private _productService:ProductService,
    private _loginService:LoginPanelService,private _toaster:ToastrService){
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.tableDisplay = this.dataSource.filteredData
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.user = this._loginService.getLocalStorage('user');
    this.getAllProducts();
    this._productService.productValueUpdated.subscribe(value=>{
      this.getAllProducts()
    })
  }

  getAllProducts(){
    this._productService.getProducts(this.user.productsId).subscribe((value:any) => {
      if(!value.error){
        this.tableDisplay = value.body.products
        this.dataSource = new MatTableDataSource(value.body.products)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }else{
        this._toaster.error(value.message)
      }
    },(rej)=>{
      if(rej){
        this._toaster.error(rej.error.message)
      }
    })
  }

  EditProduct(products:any){
    console.log(products);

  }

  deleteProduct(productItemIndex:any){
    this._productService.deleteProduct(this.user.productsId,productItemIndex).subscribe((value:any)=> {
      if(value.error){
        this._toaster.error(value.message)
      }else{
        this._toaster.success(value.message)
        this.getAllProducts()
      }
    },(rej)=>{
      this._toaster.error(rej.error.message)
    })
  }

  assignPages(event:any){
    console.log(event);

  }
}
