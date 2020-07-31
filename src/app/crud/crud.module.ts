import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { CrudRoutingModule } from './crud-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
//import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {MatButtonModule,MatIconModule} from '@angular/material'
import { HashLocationStrategy,PathLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [HomeComponent, DetailsComponent, CreateComponent, UpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    //BrowserModule,
    BrowserAnimationsModule,
    //MatButtonModule,MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CrudRoutingModule,
    HttpClientModule
  ]
})
export class CrudModule { }
