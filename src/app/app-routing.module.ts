import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
const routes: Routes = [
  {
    path:'charts',
    component :ChartComponent 
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
