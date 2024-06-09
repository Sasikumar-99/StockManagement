import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[LoginGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
