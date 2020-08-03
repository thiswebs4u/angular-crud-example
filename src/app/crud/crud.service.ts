import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CrudServiceCamel } from './crud.service.camel'
import { CrudServiceMock } from './crud.service.mock'

import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private serviceId = 0;

  constructor(private httpClient: HttpClient,
    private crudServiceMock: CrudServiceMock,
    private crudServiceCamel: CrudServiceCamel) { }

  setServiceId(serviceId) {
    this.serviceId = serviceId;
  }

  getServiceId() {
    return this.serviceId;
  }

  create(quote): Observable<any> {
  //   let postString = {"Quotes.row": [
  //     {
  //       "Quotes.QUOTATION": quote.quotation,
  //       "Quotes.AUTHOR": quote.author
  //     }
  //   ]
  // };

  switch(this.serviceId) {
    case 0:
      return this.crudServiceMock.create(quote);
      break;
    case 1:
      return this.crudServiceCamel.create(quote);
      break;
    default:
      console.log('Error create quote');
      return null;
  }
  }
  getById(id): Observable<any> {
    switch(this.serviceId) {
      case 0:
        return this.crudServiceMock.getById(id);
        break;
      case 1:
        return this.crudServiceCamel.getById(id);
        break;
      default:
        console.log('Error create quote');
        return null;
    }
  }

  getAll(): Observable<any[]> {
    switch(this.serviceId) {
      case 0:
        return this.crudServiceMock.getAll();
        break;
      case 1:
        return this.crudServiceCamel.getAll();
        break;
      default:
        console.log('Error create quote');
        return null;
    }
  }

  update(id, quote): Observable<any> {
    switch(this.serviceId) {
      case 0:
        return this.crudServiceMock.update(id,quote);
        break;
      case 1:
        return this.crudServiceCamel.update(id,quote);
        break;
      default:
        console.log('Error create quote');
        return null;
    }
  }

  delete(id){
    switch(this.serviceId) {
      case 0:
        return this.crudServiceMock.delete(id);
        break;
      case 1:
        return this.crudServiceCamel.delete(id);
        break;
      default:
        console.log('Error create quote');
        return null;
    }

  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
