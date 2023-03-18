import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ModalController } from "@ionic/angular";
import { ToastrService } from "ngx-toastr";
import { LoginPanelService } from "../login-panel/login-panel.service";
import { OtpModal } from "../otp-modal/otp.modal.component";
import { ProductDisplayModal } from "../product-display/product-display-modal/product-display.modal.component";
import { ProductService } from "../product-display/product.service";

@Component({
  selector : 'app-navbar',
  templateUrl : 'navbar.component.html',
  styleUrls : ['navbar.component.css']
})

export class Navbar {
  toggleDone!:FormControl
  constructor(public dialog: MatDialog,private _productService:ProductService,
    private _loginService:LoginPanelService,private _toaster:ToastrService,private modalCtrl:ModalController ) {
      this.toggleDone=new FormControl(false)
    }


  async addProducts() {
        // const dialogRef = this.dialog.open(ProductDisplayModal);
        const modal = await this.modalCtrl.create({
          component: ProductDisplayModal,
        });
        modal.present();
        if(modal){
          this._productService.emitEditingData(false)
        }
       await modal.onWillDismiss().then(result => {
          this._loginService.dismissLoading();
          this._productService.emitSubject(true);
        });
  }

  refreshButton(){
    this._productService.emitSubject(true);
  }
  secretKeyEnabled(ev:any){
    const checked = ev.detail.checked

    if(checked){
      this.toggleDone.setValue(true);
      const dialogRef = this.dialog.open(OtpModal)
      dialogRef.afterClosed().subscribe((result:any) => {
        this.toggleDone.setValue(false);
        this._loginService.dismissLoading();
        this._productService.emitSubject(true);
      });
    }


  }
  getProducts(){

  }
  openDialog(){

  }
}
