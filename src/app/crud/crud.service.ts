import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {CrudServiceCamel} from './crud.service.camel'
import {CrudServiceMock} from './crud.service.mock'

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private serviceId = '2';

  constructor(private httpClient: HttpClient,
              private crudServiceMock: CrudServiceMock,
              private crudServiceCamel: CrudServiceCamel) {
    console.log("Creating CrudService");
  }

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

    switch (this.serviceId) {
      case '0':
        return this.crudServiceCamel.create(quote, 'jsonserver');
      case '1':
        return this.crudServiceCamel.create(quote, 'tibco');
      case '2':
        return this.crudServiceCamel.create(quote, 'openshift');
      default:
        console.log('Error create quote');
        return null;
    }
  }

  getById(id): Observable<any> {
    switch (this.serviceId) {
      case '0':
        return this.crudServiceCamel.getById(id, 'jsonserver');
        break;
      case '1':
        return this.crudServiceCamel.getById(id, 'tibco');
        break;
      case '2':
        return this.crudServiceCamel.getById(id, 'openshift');
        break;
      default:
        console.log('Error create quote');
        return null;
    }
  }

  getAll(): Observable<any[]> {
    switch (this.serviceId) {
      case '0':
        return this.crudServiceCamel.getAll('jsonserver');
      case '1':
        return this.crudServiceCamel.getAll('tibco');
      case '2':
        return this.crudServiceCamel.getAll('openshift');
      default:
        console.log('Error create quote');
        return null;
    }
  }

  update(id, quote): Observable<any> {
    switch (this.serviceId) {
      case '0':
        return this.crudServiceCamel.update(id, quote, 'jsonserver');
      case '1':
        return this.crudServiceCamel.update(id, quote, 'tibco');
      case '2':
        return this.crudServiceCamel.update(id, quote, 'openshift');
      default:
        console.log('Error create quote');
        return null;
    }
  }

  delete(id) {
    switch (this.serviceId) {
      case '0':
        return this.crudServiceCamel.delete(id, 'jsonserver');
      case '1':
        return this.crudServiceCamel.delete(id, 'tibco');
      case '2':
        return this.crudServiceCamel.delete(id, 'openshift');
      default:
        console.log('Error create quote');
        return null;
    }
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
