import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _matDialogRef:MatDialogRef<DeleteConfirmationComponent>,private _toaster:ToastrService){}
  noOfQuantity !:any;
  confirmation : boolean = false;
  greatorQuantity:boolean = false;
  ngOnInit(): void {}

  updateQuantities(quantitiesValue:any){
    const tempData = {...this.data}
    const greatorQuantity = parseInt(quantitiesValue) !== this.data.quantity ? true : false
    tempData.quantity = this.data.quantity - parseInt(quantitiesValue);
    if(!(parseInt(quantitiesValue)<0)){
      if(parseInt(quantitiesValue) > this.data.quantity ){
        this._toaster.error('Entered quantity value is more than the available stock')
      }else if(greatorQuantity){
        this._matDialogRef.close({event:'update-quantities',data:tempData,soldCount:parseInt(quantitiesValue)});
      }else{
        if(!this.confirmation){
          this._toaster.error(`Product is about to get Empty only ${this.data.quantity} left`)
        }
      }
      if(this.confirmation && !greatorQuantity){
        this._matDialogRef.close({event:'update-quantities',data:tempData,soldCount:parseInt(quantitiesValue)});
        this.confirmation = false;
      }else{
        if(!greatorQuantity){
          this.confirmation = true;
        }
      }
    }else{
      this._toaster.error('Quantity should be more than 0')
    }
  }

  DeleteWholeProducts(){
    this._matDialogRef.close({event:'delete-quantities',data:this.data});
  }
}
