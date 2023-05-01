import { Component, ViewEncapsulation } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SettingsServiceService } from '../settings-service.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class PopoverComponent {
constructor(public popoverController: PopoverController,public _settingsService:SettingsServiceService){
}

}
