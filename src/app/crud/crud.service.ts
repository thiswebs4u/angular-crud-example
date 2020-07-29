import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //private apiServer = "http://localhost:3000";
  private apiServer = "http://localhost:8080";

  //POST /quotes/ HTTP/1.1
  //Host: localhost:8080
  //Connection: keep-alive
  //Content-Length: 67
  //Accept: application/json, text/plain, */*
  //User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36
  //Content-Type: text/plain
  //Origin: http://localhost:4200
  //Sec-Fetch-Site: same-site
  //Sec-Fetch-Mode: cors
  //Sec-Fetch-Dest: empty
  //Referer: http://localhost:4200/crud/create
  //Accept-Encoding: gzip, deflate, br
  //Accept-Language: en-US,en;q=0.9



  httpOptions = {
    headers: new HttpHeaders({
      'Connection': 'keep-alive',
      'Content-Type': 'text/plain',
      'Origin': 'http://localhost:4200',
      'Accept': 'application/json, text/plain, */*',
      'Cache-Control': 'no-cache',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'http://localhost:4200/crud/create',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',

    }),
    //observe: "response",
    //responseType: "json"
  }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json'
       });
  options = {
    headers: this.httpHeaders
 };

  constructor(private httpClient: HttpClient) { }

  create(quote): Observable<any> {
    let postString = {"Quotes.row": [
      {
        "Quotes.QUOTATION": quote.quotation,
        "Quotes.AUTHOR": quote.author
      }
    ]
  };

//    return this.httpClient.post<any>(this.apiServer + '/quotes/', JSON.stringify(postString),this.httpOptions)
    return this.httpClient.post<any>(this.apiServer + '/quotes/', postString)
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
  getById(id): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/quotes/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiServer + '/quotes/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, quote): Observable<any> {
    return this.httpClient.put<any>(this.apiServer + '/quotes/' + id, JSON.stringify(quote), {
      headers: this.httpHeaders,
      observe: "response",
      responseType: "json"
         })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<any>(this.apiServer + '/quotes/' + id, {
      headers: this.httpHeaders,
      observe: "response",
      responseType: "json"
         })
    .pipe(
      catchError(this.errorHandler)
    )
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
