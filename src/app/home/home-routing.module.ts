import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { HomePage } from './home.page';
import {ProductDisplay} from './product-display/display.component'
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'',
        redirectTo:'productDisplay',
        pathMatch:'full'
      },
      {
        path:'productDisplay',
        component:ProductDisplay
      },
      {
        path:'chatApp',
        loadChildren: () => import('./chat-app/chatApp.module').then( m => m.ChatApp)
      },
      {
        path:'settings',
        component:SettingsComponent
      },
      {
        path:'reports',
        component:ReportsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
