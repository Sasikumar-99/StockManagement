import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LoginPanelComponent } from './home/login-panel/login-panel.component';
import { LoginPanelService } from './home/login-panel/login-panel.service';
import { ImportsModule } from './common-module/common-module';
import { CommonService } from './common.service';
@NgModule({
  declarations: [AppComponent, LoginComponent, LoginPanelComponent],
  imports: [BrowserModule,
    RouterModule,
    IonicModule.forRoot({mode:'ios'}),
    AppRoutingModule,
    ImportsModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LoginPanelService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
