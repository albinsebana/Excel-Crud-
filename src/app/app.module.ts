import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';

import { ExcelComponent } from './excel/excel.component';

@NgModule({
  declarations: [
    AppComponent,


    ExcelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,FormsModule

 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
