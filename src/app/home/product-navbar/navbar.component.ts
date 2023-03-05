import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { LoginPanelService } from "../login-panel/login-panel.service";
import { ProductDisplayModal } from "../product-display/product-display-modal/product-display.modal.component";
import { ProductService } from "../product-display/product.service";

@Component({
  selector : 'app-navbar',
  templateUrl : 'navbar.component.html',
  styleUrls : ['navbar.component.css']
})

export class Navbar {
  constructor(public dialog: MatDialog,private _productService:ProductService,
    private _loginService:LoginPanelService,private _toaster:ToastrService ) {}


  addProducts() {
        const dialogRef = this.dialog.open(ProductDisplayModal);
        dialogRef.afterClosed().subscribe(result => {
          this._productService.emitSubject(true);
        });
    // const user = this._loginService.getLocalStorage('user')
  }

  getProducts(){

  }
  openDialog(){

  }
}
