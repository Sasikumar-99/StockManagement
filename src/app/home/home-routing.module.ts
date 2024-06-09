import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ProductDisplayComponent } from './product-display/display.component'
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntryComponent } from './entry/entry.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'productDisplay',
        component:ProductDisplayComponent
      },
      {
        path:'settings',
        component:SettingsComponent
      },
      {
        path:'reports',
        component:ReportsComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'entry',
        component:EntryComponent
      },
      {
        path:'',
        redirectTo:'productDisplay',
        pathMatch:'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
