import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { EntryServiceService } from './entry-service.service';
import { LoginPanelService } from '../login-panel/login-panel.service';
import { ToastrService } from 'ngx-toastr';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as moment from 'moment';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(CdkVirtualScrollViewport) viewPort!: CdkVirtualScrollViewport;
  displayedColumns=['s.no','date','model','customerName','description','mobileNo','status','price'];
  todayDate = new Date().toLocaleDateString();
  dataSource!:MatTableDataSource<AbstractControl>
  servicePanel!:FormGroup
  serviceList!:FormGroup
  cloneReports:any[]=[];
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<any[]>;
  myControl = new FormControl('');
  user:any
  formArr$!:Observable<any>
  constructor(private _entryService:EntryServiceService,private _loginService:LoginPanelService,private _toaster: ToastrService){
    this.servicePanel = new FormGroup({
      serviceEntry:new FormArray([])
    });
    this.dataSource = new MatTableDataSource(this.getServiceEntry.controls)
  }
  ngOnInit(): void {
    this.user = this._loginService.getLocalStorage('user');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.getEntryList()
  }

  getEntryList(){
    this._loginService.showLoading();
    this._entryService.getEntryList(this.user.entryId).subscribe((entryLists:any)=>{
      this._loginService.dismissLoading();
      if(!entryLists.error){
        if(entryLists.body.length==0){
          const serviceList = new FormGroup({
            serialNo:new FormControl(1),
            date : new FormControl(moment(new Date()).format('MMMM Do YYYY')),
            model : new FormControl(''),
            customerName : new FormControl(''),
            description : new FormControl(''),
            imei : new FormControl(''),
            contactNo : new FormControl(''),
            status : new FormControl(''),
            price : new FormControl('')
          });
          this.getServiceEntry.push(serviceList);
        }else{
          entryLists.body.forEach((entry:any) => {
            const serviceList = new FormGroup({
              serialNo:new FormControl(''),
              date : new FormControl(''),
              model : new FormControl(''),
              customerName : new FormControl(''),
              description : new FormControl(''),
              imei : new FormControl(''),
              contactNo : new FormControl(''),
              status : new FormControl(''),
              price : new FormControl('')
            });
            this.getServiceEntry.push(serviceList)
          });
          this.getServiceEntry.patchValue(entryLists.body)
        }
      }else{
        this._toaster.error(entryLists.message)
      }
      this.servicePanel.valueChanges.subscribe(formVal=>{
        this._entryService.save(formVal.serviceEntry,this.user.entryId).subscribe((UpdatedValue:any)=>{
          if(!UpdatedValue.error){
            console.log(UpdatedValue.body);
          }else{
            this._toaster.error(UpdatedValue.message)
          }
        })
      })
      this.FormValChanges();
    },(err)=>{
      this._loginService.dismissLoading();
    })
  }

  FormValChanges(){
  this.formArr$ = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        return of(this.getServiceEntry.controls as AbstractControl[]).pipe(
          map((formArr: AbstractControl[]) =>
            formArr.filter((group: AbstractControl) => {
              if(group.get('serialNo')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('serialNo')?.value.toString().toLowerCase().includes(val?.toLowerCase());
              }else if(group.get('date')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('date')?.value.toString().toLowerCase().includes(val?.toLowerCase())
              }else if(group.get('model')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('model')?.value.toString().toLowerCase().includes(val?.toLowerCase())
              }else if(group.get('customerName')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('customerName')?.value.toString().toLowerCase().includes(val?.toLowerCase())
              }else if(group.get('description')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('description')?.value.toString().toLowerCase().includes(val?.toLowerCase())
              }else if(group.get('contactNo')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('contactNo')?.value.toString().toLowerCase().includes(val?.toLowerCase())
              }else if(group.get('status')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('status')?.value.toString().toLowerCase().includes(val?.toLowerCase())
              }else if(group.get('price')?.value.toString().toLowerCase().includes(val?.toLowerCase())){
                return group.get('price')?.value.toString().toLowerCase().includes(val?.toLowerCase())
              }
            })
          )
        );
      })
    );
  }



  private _filter(value: any): any[] {
    const filterValue = value.toString().toLocaleLowerCase();
    const model = this.getServiceEntry.value.filter((option:any) =>  option.model.toLowerCase().includes(filterValue));
    const serialNo = this.getServiceEntry.value.filter((value: any) => value.serialNo.toString().toLowerCase().includes(filterValue));
    const date = this.getServiceEntry.value.filter((value: any) => value.date.toLowerCase().includes(filterValue));
    const customerName = this.getServiceEntry.value.filter((value: any) => value.customerName.toLowerCase().includes(filterValue));
    const description = this.getServiceEntry.value.filter((value: any) => value.description.toLowerCase().includes(filterValue));
    const contactNo = this.getServiceEntry.value.filter((value: any) => value.contactNo.toLowerCase().includes(filterValue));
    const status = this.getServiceEntry.value.filter((value: any) => value.status.toLowerCase().includes(filterValue));
    const price = this.getServiceEntry.value.filter((value: any) => value.price.toLowerCase().includes(filterValue));
   if (date.length) {
      return date
    } else if (model.length) {
      return model
    } else if (customerName.length) {
      return customerName
    } else if (description.length) {
      return description
    } else if (contactNo.length) {
      return contactNo
    } else if (status.length) {
      return status
    } else if (price.length) {
      return price
    } else if(serialNo.length){
      return serialNo
    } else {
      return []
    }
  }
  newForm(){
    const previousValue=(this.getServiceEntry.controls[this.getServiceEntry.length-1]as FormGroup).get('serialNo')?.value;
    const serviceList = new FormGroup({
      serialNo:new FormControl(previousValue+1),
      date : new FormControl(moment(new Date()).format('MMMM Do YYYY')),
      model : new FormControl(''),
      customerName : new FormControl(''),
      description : new FormControl(''),
      imei : new FormControl(''),
      contactNo : new FormControl(''),
      status : new FormControl(''),
      price : new FormControl('')
    });
    this.getServiceEntry.push(serviceList);
    this.FormValChanges();
  }

  get getServiceEntry(){
    return (this.servicePanel as FormGroup).get('serviceEntry') as FormArray;
  }

}
