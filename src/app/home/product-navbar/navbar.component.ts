import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ModalController } from "@ionic/angular";
import { LoginPanelService } from "../login-panel/login-panel.service";
import { OtpModalComponent } from "../otp-modal/otp.modal.component";
import { ProductDisplayModalComponent } from "../product-display/product-display-modal/product-display.modal.component";
import { ProductService } from "../product-display/product.service";
import { CommonService } from "src/app/common.service";

@Component({
  selector : 'app-navbar',
  templateUrl : 'navbar.component.html',
  styleUrls : ['navbar.component.css']
})

export class NavbarComponent {

  @Input() device!: Boolean;
  toggleDone!:FormControl
  constructor(
    private _productService:ProductService,
    private _loginService:LoginPanelService,
    private modalCtrl:ModalController,
    private _commonService: CommonService,
    public dialog: MatDialog ) {
      this.toggleDone=new FormControl(false)
    }


  async addProducts() {
        const modal = await this.modalCtrl.create({
          component: ProductDisplayModalComponent,
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
      const dialogRef = this.dialog.open(OtpModalComponent)
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
  openChat(){

  }

  get productService(): ProductService {
    return this._productService;
  }

  get commonService(): CommonService {
    return this._commonService;
  }
}
