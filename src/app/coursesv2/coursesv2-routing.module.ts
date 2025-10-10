import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Coursesv2Component } from './coursesv2.component';

const routes: Routes = [
  { path: '', component: Coursesv2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Coursesv2RoutingModule { }
