import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExcelComponent } from './excel/excel.component';

const routes: Routes = [

  {path:'login',component:ExcelComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
