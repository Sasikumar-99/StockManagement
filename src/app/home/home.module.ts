import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Navbar } from './product-navbar/navbar.component';
import { LoginPanel } from './login-panel/login-panel.component';
import { HomePageRoutingModule } from './home-routing.module';
import { ProductDisplay } from './product-display/display.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { LoginPanelService } from './login-panel/login-panel.service';
import {ProductDisplayModal} from './product-display/product-display-modal/product-display.modal.component';
import { ProductService } from './product-display/product.service';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [
    ToastrModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    HttpClientModule
  ],
  declarations: [HomePage,Navbar,ProductDisplay,LoginPanel,ProductDisplayModal],
  providers : [ProductService,LoginPanelService]
})
export class HomePageModule {}
