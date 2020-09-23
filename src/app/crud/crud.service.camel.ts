import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceCamel {

  private apiServer = "http://localhost:9000";
  //private apiServer = "http://localhost:8080";

  httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .set('Accept', 'application/json')
    //.set('target', 'tibco')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true')
    .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    //    'Access-Control-Request-Headers':'*',
    .set('Access-Control-Allow-Headers', 'access-control-allow-methods,access-control-allow-origin,authorization,content-type');

  options = {
    headers: this.httpHeaders,
//    observe: 'response',
//    responseType: 'json',
  };

  constructor(private httpClient: HttpClient) {
  }

  create(quote, target): Observable<any> {
    let postString = {
      "Quotes.row": [
        {
          "Quotes.QUOTATION": quote.quotation,
          "Quotes.AUTHOR": quote.author
        }
      ]
    };

    this.options.headers = this.httpHeaders.set('target', target);
//    return this.httpClient.post<any>(this.apiServer + '/quotes/', JSON.stringify(postString),this.httpOptions)
    return this.httpClient.post<any>(this.apiServer + '/quotes/', postString, this.options)
    // return this.httpClient.post<any>(this.apiServer + '/quotes/', JSON.stringify(postString) ,
    // {
    //  headers: this.httpHeaders,
    //  observe: "response",
    //  responseType: "json"
    //     })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id, target): Observable<any> {
    this.options.headers = this.httpHeaders.set('target', target);
    return this.httpClient.get<any>(this.apiServer + '/quotes/' + id, this.options)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(target): Observable<any[]> {
    //this.httpHeaders = this.httpHeaders.delete('target');
    this.options.headers = this.httpHeaders.append('target', target);

    console.log(this.httpHeaders);
    return this.httpClient.get<any[]>(this.apiServer + '/quotes/', this.options)
      .pipe(catchError(this.errorHandler)
      )
  }

  update(id, quote, target): Observable<any> {
    this.options.headers = this.httpHeaders.set('target', target);
    let postString = {
          "Quotes.ID": quote.id,
          "Quotes.QUOTATION": quote.quotation,
          "Quotes.AUTHOR": quote.author
        };

    return this.httpClient.put<any>(this.apiServer + '/quotes/' + id, JSON.stringify(postString), this.options)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id, target) {
    this.options.headers = this.httpHeaders.set('target', target);
    return this.httpClient.delete<any>(this.apiServer + '/quotes/' + id, this.options)
      .pipe(
        catchError(this.errorHandler)
      )
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
