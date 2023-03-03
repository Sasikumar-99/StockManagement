import { AfterViewInit, Component, ViewChild } from "@angular/core";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface UserData {
  productName: string;
  sellingPrice: string;
  receivedPrice: string;
  quantity: number;
}

@Component({
  selector : 'app-display',
  templateUrl : 'display.component.html',
  styleUrls : ['display.component.css']
})

export class ProductDisplay implements AfterViewInit {
  displayedColumns: string[] = ['productName', 'sellingPrice', 'receivedPrice', 'quantity'];
  dataSource !: MatTableDataSource<UserData>;
  productsValue = {
    productName : '',
    sellingPrice : '',
    receivedPrice : '',
    quantity : 0
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (){
    this.dataSource = new MatTableDataSource([this.productsValue]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
