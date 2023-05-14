import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ProductService } from "./product.service";
import { LoginPanelService } from "../login-panel/login-panel.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { ProductDisplayModal } from "./product-display-modal/product-display.modal.component";
import { ModalController } from "@ionic/angular";
import { DeleteConfirmationComponent } from "../delete-confirmation/delete-confirmation.component";
import { FormControl } from "@angular/forms";
import * as moment from "moment";
export interface UserData {
  productName: string;
  sellingPrice: string;
  receivedPrice: string;
  quantity: number;
  _id:string
}

@Component({
  selector: 'app-display',
  templateUrl: 'display.component.html',
  styleUrls: ['display.component.css'],
})
export class ProductDisplay implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'productName',
    'sellingPrice',
    'receivedPrice',
    'quantity',
    'category',
    'edit',
    'delete',
  ];
  displayedFooter: string[] = ['paginator'];
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('popover') popover:any;
  restock:boolean = false;
  user: any;
  tableDisplay: any;
  tableEditable!: boolean;
  categorySelected: FormControl = new FormControl('');
  isOpen = false;
  needToReStock:any
  constructor(
    private _productService: ProductService,
    private _loginService: LoginPanelService,
    private _toaster: ToastrService,
    private matDialog: MatDialog,
    private modalCtrl: ModalController
  ) {
    this.tableEditable = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.tableDisplay = this.dataSource.filteredData;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.user = this._loginService.getLocalStorage('user');
  }
  ngAfterViewInit() {
    this.getAllProducts();
    this._productService.productValueUpdated.subscribe((value) => {
      this.getAllProducts();
    });
  }

  getAllProducts() {
    this._productService.getProducts(this.user.productsId).subscribe(
      (value: any) => {
        if (!value.error) {
          this.tableDisplay = value.body.products;
          this.selectedCategoryChange();
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

  async EditProduct(products: any, productIndex: any) {
    const data = { products: products, productItemIndex: productIndex };
    const modal = await this.modalCtrl.create({
      component: ProductDisplayModal,
      componentProps: { data: data },
    });
    modal.present();
    if (modal) {
    }
    await modal.onWillDismiss().then((result) => {
     this._loginService.showLoading();
      this._productService.emitSubject(true);
    });
  }

  deleteProduct(productItemIndex: any) {
    const dialogref = this.matDialog.open(DeleteConfirmationComponent, {
      data: this.tableDisplay[productItemIndex],
    });

    dialogref.afterClosed().subscribe((dialogData) => {
      if (dialogData) {
        if (dialogData.event.includes('delete')) {
          this._productService
            .deleteProduct(this.user.productsId, productItemIndex)
            .subscribe(
              (value: any) => {
                if (value.error) {
                  this._toaster.error(value.message);
                } else {
                  this._toaster.success(value.message);
                  this._productService.emitSubject(true);
                }
                this._loginService.dismissLoading();
              },
              (rej) => {
                this._toaster.error(rej.error.message);
                this._loginService.dismissLoading();
              }
            );
        } else if (dialogData.event.includes('update')) {
          this.updateProduct(productItemIndex,dialogData,true)
        }
      }
    });
  }

  addReports(index:number,soldQuantity:number){
    const receivedPrice = parseFloat(this.tableDisplay[index].receivedPrice)*soldQuantity;
    const soldPrice = parseFloat(this.tableDisplay[index].sellingPrice)*soldQuantity;
    const soldData = {
      category:this.tableDisplay[index].category,
      productName:this.tableDisplay[index].productName,
      soldCount:soldQuantity,
      receivedPrice:receivedPrice,
      soldPrice:soldPrice,
      profit : soldPrice-receivedPrice
    }
    const soldObject ={
      date:moment(new Date()).format('DD/MM/yyyy'),
      soldData:[soldData]
    }
    this._productService.getReports(this.user.reportId).subscribe((reports:any)=>{
      if(!reports.error){
        if(reports.body.reportsArchive.length>0){
          const existingReport = reports.body.reportsArchive.find((reports:any) => reports.date === soldObject.date);
          const existingReportIndex = reports.body.reportsArchive.findIndex((reports:any) => reports.date === soldObject.date);
          if(existingReport && existingReportIndex!==-1){
            const soldDataExists = existingReport.soldData.find((data:any)=>data.productName.toLowerCase() === soldData.productName.toLowerCase());
            const soldDataExistsIndex = existingReport.soldData.findIndex((data:any)=>data.productName.toLowerCase() === soldData.productName.toLowerCase());
            if(soldDataExists && soldDataExistsIndex!==-1){
              const newSoldData = {...soldDataExists};
              newSoldData.soldCount = soldDataExists.soldCount + soldData.soldCount;
              newSoldData.receivedPrice = soldDataExists.receivedPrice + soldData.receivedPrice;
              newSoldData.soldPrice = soldDataExists.soldPrice + soldData.soldPrice;
              newSoldData.profit = soldDataExists.profit + soldData.profit;
              existingReport.soldData.splice(soldDataExistsIndex,1,newSoldData);
              reports.body.reportsArchive.splice(existingReportIndex,1,existingReport);
              this.updateReport(reports.body.reportsArchive);
            }else{
              existingReport.soldData.push(soldData);
              this.updateReport(reports.body.reportsArchive);
            }
          }else{
            reports.body.reportsArchive.push(soldObject);
            this.updateReport(reports.body.reportsArchive)
          }
        }else{
          reports.body.reportsArchive.push(soldObject);
          this.updateReport(reports.body.reportsArchive)
        }
      }
    })
  }

  updateReport(reportArchive:any[]){
    this._productService.addReports(this.user.reportId,reportArchive).subscribe((updatedReports:any)=>{
      if(updatedReports.error){
        this._toaster.error(updatedReports.message);
      }else{
        this._toaster.success(updatedReports.message);
      }
    })
  }
  assignPages(event: any) {}

  qrCodeClick(index: number) {
    console.log(index);
  }
  selectedCategoryChange() {
    let newFiltered:any = []
    const forFiltering = [...this.tableDisplay];
    if(this.categorySelected.value.length){
      this.categorySelected.value.forEach((value: any) => {
        forFiltering.forEach((tableValue:any)=>{
          if(tableValue.category === value){
            newFiltered.push(tableValue)
          }
        })
      });
    }else{
      newFiltered = forFiltering
    }

    this.dataSource = new MatTableDataSource(newFiltered);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  presentPopover(e: Event,editableProduct:any,Index:number) {
    this.needToReStock = {
      product:editableProduct,
      index:Index
    };
    if(editableProduct.quantity<=0){
      this.popover.event = e;
      this.isOpen = true;
    }
    this.restock = false;
  }

  updateProduct(index:number,dialogData:any,addReports = false){
    const product = addReports?dialogData.data:dialogData
    this._productService
    .updateProduct(this.user.productsId, index, product)
    .subscribe(
      (value: any) => {
        if (!value.error) {
          this._toaster.success(value.message);
          this._productService.emitSubject(true);
          if(addReports){
            this.addReports(index,dialogData.soldCount);
          }
          this.isOpen = false;
        } else {
          this._toaster.error(value.message);
        }
        this._loginService.dismissLoading();
      },
      (rej) => {
        if (rej) {
          this._toaster.error(rej.error.message);
        this._loginService.dismissLoading();
        }
      }
    );
  }

  restockQuantities(quantity:any){
    const stock = parseFloat(quantity);
    const newProduct = this.needToReStock.product;
    newProduct.quantity = stock;
    if(!isNaN(stock) && stock > 0 && newProduct){
      this.updateProduct(this.needToReStock.index,newProduct);
    }else{
      this._toaster.error('Quantity should be more than 0')
    }
    this._productService.emitSubject(true);
  }
}
