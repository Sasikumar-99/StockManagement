import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { Navbar } from './product-navbar/navbar.component';
import { HomePageRoutingModule } from './home-routing.module';
import { ProductDisplay } from './product-display/display.component';
import { LoginPanelService } from './login-panel/login-panel.service';
import {ProductDisplayModal} from './product-display/product-display-modal/product-display.modal.component';
import { ProductService } from './product-display/product.service';
import { OtpModal } from './otp-modal/otp.modal.component';
import { SecretKeyDirective } from '../secret-key.directive';
import { Spinner } from './spinner/spinnet.component';
import { ImportsModule } from '../common-module/common-module';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { PopoverComponent } from './settings/popover/popover.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecretKeyPipePipe } from '../secret-key-pipe.pipe';
import { EntryComponent } from './entry/entry.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    ImportsModule
  ],
  exports:[ProductDisplay],
  declarations: [SecretKeyPipePipe,Spinner,SecretKeyDirective,HomePage,Navbar,ProductDisplay,ProductDisplayModal,OtpModal, DeleteConfirmationComponent, SettingsComponent, PopoverComponent, ReportsComponent, DashboardComponent, EntryComponent],
  providers : [ProductService,LoginPanelService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
