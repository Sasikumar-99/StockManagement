import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { LoginPanelService } from '../login-panel/login-panel.service';
import { ProductService } from '../product-display/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  user: any;
  currentUserReports!: any;
  sortedReports:any=[] = [];
  formattedDate: any;
  range = new FormGroup({
    start: new FormControl<any>(null),
    end: new FormControl<any>(null),
  });
  displayedColumns=['productName','quantitySold','receivedPrice','soldPrice','profit'];
  displayedFooter: string[] = ['paginator'];
  constructor(
    private _loginService: LoginPanelService,
    private _productService: ProductService,
    private _toaster: ToastrService
  ) {
    this.user = this._loginService.getLocalStorage('user');
  }

  ngOnInit(): void {
    this.getAllReports();
  }

  get start(){
    return this.range.get('start')?.value
  }
  get end(){
    return this.range.get('end')?.value
  }

  getAllReports() {
    this._productService
      .getReports(this.user.reportId)
      .subscribe((reports: any) => {
        if (!reports.error) {
          this.currentUserReports = reports.body.reportsArchive;
        } else {
          this._toaster.error(reports.message);
        }
      });
  }

  onChangingDate() {
    const startDate: any = moment(this.range.value.start)
      .format('DD/MM/YYYY')
      .toString();
    const endDate: any = moment(this.range.value.end)
      .format('DD/MM/YYYY')
      .toString();
    this.formattedDate = {
      start: startDate,
      end: endDate,
    }
    if(startDate && endDate){
      if(this.currentUserReports.length>0){
        const betweenDates = this.betweenDates();
        this.sortedReports = [];
         betweenDates.forEach(dates =>{
          this.currentUserReports.forEach((reports:any) => {
            if(reports.date === dates){
              this.sortedReports.push(reports)
            }
          });
        });
      }
    }
  }

  betweenDates() {
    let startDate = moment(this.range.value.start);
    let endDate = moment(this.range.value.end);
    let date = [];
    for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, 'days')) {
      date.push(m.format('DD/MM/YYYY'));
    }
    return date
  }


  assignPages(event: any,soldData:any) {

  }
}
