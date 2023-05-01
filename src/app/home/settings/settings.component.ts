
import { Component } from '@angular/core';
import { LoginPanelService } from '../login-panel/login-panel.service';
import { ToastrService } from 'ngx-toastr';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { SettingsServiceService } from './settings-service.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  user: any;
  existingCategories!:any[]
  constructor(private _loginService: LoginPanelService,
    private _toaster:ToastrService,
    public popoverController: PopoverController,
    public _settingsService:SettingsServiceService) {
    this.user = this._loginService.getLocalStorage('user')
    this.existingCategories = [...this.user.categories];
  }

  addCategories(value:any){
    const existingCategories = this.existingCategories.find(existing=>value === existing.name)
    if(value && !existingCategories){
      this.user = this._loginService.getLocalStorage('user');
      this.existingCategories.push({checked:true,name:value})
      this.updateCategories(this.existingCategories)
    }
  }

  updateCategories(categories:any[]){
   return this._loginService.setCategories(this.user._id,categories).subscribe((value:any)=>{
      if(value.error){
        this._toaster.error(value.message);
      }else{
        this._loginService.setLocalStorage('user',value.body)
        this.user = this._loginService.getLocalStorage('user');
        this._toaster.success(value.message);
      }
    },(rej)=>{
      this._loginService.dismissLoading();
      this._toaster.error(rej.error.message)
    })
  }

  async presentPopover(e: Event,index:number) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: e,
      size:'cover'
    });

    await popover.present();

    // const { role } = await popover.onDidDismiss();
    this._settingsService.deleteClicked.subscribe(value=>{
      if(value){
        this.existingCategories.splice(index,1)
        this.updateCategories(this.existingCategories);
        popover.dismiss();
        this._settingsService.isClicked(false);
      }
    })
  }

  onUncheck(index:number){
    const checkOrUncheck = this.existingCategories[index].checked ? false : true
    this.existingCategories[index].checked = checkOrUncheck;
    this.updateCategories(this.existingCategories);
  }
}
