import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from 'ng-otp-input';
import { QRCodeModule } from 'angularx-qrcode';
import {MatTooltipModule} from '@angular/material/tooltip';
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
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
@NgModule({
  declarations: [],
  imports: [
    ScrollingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    QRCodeModule,
    ToastrModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    HttpClientModule,
    NgOtpInputModule,
    MatTooltipModule
  ],exports : [
    ScrollingModule,
    MatNativeDateModule,
    MatDatepickerModule,
    QRCodeModule,
    ToastrModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    HttpClientModule,
    NgOtpInputModule,
    MatTooltipModule
  ]
})
export class ImportsModule {}
