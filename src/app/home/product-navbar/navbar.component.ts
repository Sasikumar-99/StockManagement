import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProductDisplayModal } from "../product-display/product-display-modal/product-display.modal.component";

@Component({
  selector : 'app-navbar',
  templateUrl : 'navbar.component.html',
  styleUrls : ['navbar.component.css']
})

export class Navbar {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ProductDisplayModal);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
