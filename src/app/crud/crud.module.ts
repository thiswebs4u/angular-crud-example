import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
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
//import { HashLocationStrategy,PathLocationStrategy, LocationStrategy } from '@angular/common';
import { CrudService } from './crud.service';

@NgModule({
  declarations: [HomeComponent, DetailsComponent, CreateComponent, UpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CrudRoutingModule,
    HttpClientModule
  ]
})
export class CrudModule {
  constructor(@Optional() @SkipSelf() parentModule?: CrudModule) {
    if (parentModule) {
      throw new Error(
        'CrudModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<CrudModule> {
    return {
      ngModule: CrudModule,
      providers: [CrudService]
    };
  }
}
