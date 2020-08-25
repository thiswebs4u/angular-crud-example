import { NgModule, ModuleWithProviders } from '@angular/core';
import {FormsModule} from '@angular/forms';

//import { AppRoutingModule } from './app-routing.module';
import { CrudRoutingModule } from './crud/crud-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CrudModule } from './crud/crud.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy,PathLocationStrategy, LocationStrategy } from '@angular/common';

import { CrudService } from './crud/crud.service';


// import { DetailsComponent } from './crud/details/details.component';
// import { CreateComponent } from './crud/create/create.component';
// import { UpdateComponent } from './crud/update/update.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CrudModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    CrudRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CrudModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }
