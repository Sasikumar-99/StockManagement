import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { LoginPanel } from './home/login-panel/login-panel.component';
import { LoginPanelService } from './home/login-panel/login-panel.service';
import { ImportsModule } from './common-module/common-module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [AppComponent, LoginComponent,LoginPanel],
  imports: [BrowserModule,
    ToastrModule.forRoot(),
    IonicModule.forRoot({mode:'ios'}),
    AppRoutingModule,
    ImportsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LoginPanelService],
  bootstrap: [AppComponent]
})
export class AppModule {}
