import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns=['s.no','date','model','customerName','description','mobileNo','status','price'];
  todayDate = new Date().toLocaleDateString();
  dataSource!:MatTableDataSource<AbstractControl>
  servicePanel!:FormGroup
  serviceList!:FormGroup
  cloneReports:any[]=[];
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<any[]>;
  myControl = new FormControl('');
  constructor(){
    this.servicePanel = new FormGroup({
      serviceEntry:new FormArray([])
    });
    this.dataSource = new MatTableDataSource(this.getServiceEntry.controls)
  }
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  
  private _filter(value: string): any[] {
    let filterValue = value.toLocaleLowerCase();
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
      return this.getServiceEntry.value
    }
  }
  newForm(){
    const serviceList = new FormGroup({
      serialNo:new FormControl(''),
      date : new FormControl(''),
      model : new FormControl(''),
      customerName : new FormControl(''),
      description : new FormControl(''),
      contactNo : new FormControl(''),
      status : new FormControl(''),
      price : new FormControl('')
    });
    const serviceEntry = (this.servicePanel as FormGroup).get('serviceEntry') as FormArray;
    serviceEntry.push(serviceList);
    if(serviceEntry.length===1){
      (serviceEntry.controls[0]as FormGroup).get('serialNo')?.setValue(1);
      (serviceEntry.controls[0]as FormGroup).get('model')?.setValue('samsung');
    } 
  }

  get getServiceEntry(){
    return (this.servicePanel as FormGroup).get('serviceEntry') as FormArray;
  }

  setSerialNumber(index:number){
    const serviceEntry = (this.servicePanel as FormGroup).get('serviceEntry') as FormArray;
    const existingValue = (serviceEntry.controls[index]as FormGroup).get('serialNo');
    if(index === 0){
      return existingValue?.value;
    }else{
     const previousSerialNo = (serviceEntry.controls[index-1]as FormGroup).get('serialNo')?.value
      existingValue?.setValue(previousSerialNo+1);
      return existingValue?.value;
    }
  }
  // applyFilter(event: Event) {
  //   const filterValue =new RegExp(`/(event.target as HTMLInputElement).value/gi`);

  //   let tempArray = []
  //   const serviceEntry = ((this.servicePanel as FormGroup).get('serviceEntry') as FormArray).value
  //   // const serialNo = serviceEntry.filter((value: any) => value.serialNo.match(new RegExp(`/${filterValue}/`)));
  //   // const date = serviceEntry.filter((value: any) => value.date.match(new RegExp(`/${filterValue}/`)));
  //   const model = serviceEntry.filter((value: any) =>  filterValue.test(value.model));
  //   // const customerName = serviceEntry.filter((value: any) => value.customerName.match(new RegExp(`/${filterValue}/`)));
  //   // const description = serviceEntry.filter((value: any) => value.description.match(new RegExp(`/${filterValue}/`)));
  //   // const contactNo = serviceEntry.filter((value: any) => value.contactNo.match(new RegExp(`/${filterValue}/`)));
  //   // const status = serviceEntry.filter((value: any) => value.status.match(new RegExp(`/${filterValue}/`)));
  //   // const price = serviceEntry.filter((value: any) => value.price.match(new RegExp(`/${filterValue}/`)));
  // //  if (date.length) {
  // //     tempArray =  date
  // //   } else if (model.length) {
  // //     tempArray =  model
  // //   } else if (customerName.length) {
  // //     tempArray =  customerName
  // //   } else if (description.length) {
  // //     tempArray =  description
  // //   } else if (contactNo.length) {
  // //     tempArray =  contactNo
  // //   } else if (status.length) {
  // //     tempArray =  status
  // //   } else if (price.length) {
  // //     tempArray =  price
  // //   } else {
  // //     tempArray =  serviceEntry
  // //   }
  // if(model.length){
  //   tempArray =  model
  // }else{
  //     tempArray =  serviceEntry
  // }
  //   console.log(tempArray);
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
    
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  onSelFunc(opt:any){
    console.log(opt);
    
  }
}
