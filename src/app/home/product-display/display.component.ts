import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ProductService } from "./product.service";
import { LoginPanelService } from "../login-panel/login-panel.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { ProductDisplayModal } from "./product-display-modal/product-display.modal.component";
import { ModalController } from "@ionic/angular";

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
  displayedColumns: string[] = ['productName', 'sellingPrice', 'receivedPrice', 'quantity','edit','delete','code'];
  displayedFooter:string[]=['paginator']
  dataSource !: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   user:any
   tableDisplay:any
   tableEditable!:boolean
  constructor (private _productService:ProductService,
    private _loginService:LoginPanelService,private _toaster:ToastrService,private matDialog:MatDialog,private modalCtrl:ModalController){
      this.tableEditable = false;
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
    this._loginService.showLoading();
    this._productService.getProducts(this.user.productsId).subscribe((value:any) => {
      if(!value.error){
        this._loginService.dismissLoading();
        this.tableDisplay = value.body.products
        this.dataSource = new MatTableDataSource(value.body.products)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }else{
        this._loginService.dismissLoading();
        this._toaster.error(value.message)
      }
    },(rej)=>{
      if(rej){
        this._loginService.dismissLoading();
        this._toaster.error(rej.error.message)
      }
    })
  }

 async EditProduct(products:any,productIndex:any){
  const data = {products:products,productItemIndex:productIndex}
  // await this._productService.emitEditingData(data)
  const modal = await this.modalCtrl.create({
    component: ProductDisplayModal,
    componentProps:{'data':data},
  });
  modal.present();
  if(modal){

  }
 await modal.onWillDismiss().then(result => {
    this._loginService.dismissLoading();
    this._productService.emitSubject(true);
  });
    // this.matDialog.open(ProductDisplayModal,{data:{products:products,productItemIndex:productIndex}})
  }

  deleteProduct(productItemIndex:any){
    this._loginService.showLoading();
    this._productService.deleteProduct(this.user.productsId,productItemIndex).subscribe((value:any)=> {
      if(value.error){
        this._loginService.dismissLoading();
        this._toaster.error(value.message)
      }else{
        this._loginService.dismissLoading();
        this._toaster.success(value.message)
        this.getAllProducts()
      }
    },(rej)=>{
      this._loginService.dismissLoading();
      this._toaster.error(rej.error.message)
    })
  }

  assignPages(event:any){
  }

  qrCodeClick(index:number){
    console.log(index);

  }
}
