import {Component, OnInit} from '@angular/core';
import {CrudService} from '../crud.service';
import {Quote} from '../quote';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quotes: Quote[] = [];
  quotesIn: Quote[] = [];
  isDataAvailable: boolean = false;

  constructor(private location: Location,
              public crudService: CrudService) {
  }

  ngOnInit() {
    console.log("home.ngOnInit");
    this.crudService.getAll().subscribe((data: Quote[]) => {
      console.log('data', data);

      switch (this.crudService.getServiceId()) {
        case '0':
          this.quotes = data.map(item => {
            return {id: item['Quotes.ID'], quotation: item['Quotes.QUOTATION'], author: item['Quotes.AUTHOR']};
          })
          console.log('0');
          break;
        case '1':
          this.quotesIn = data["Quotes.IOF_TESTOutput"]["Quotes.row"];
          this.quotes = this.quotesIn.map(item => {
            return {id: item[0], quotation: item[1], author: item[2]};
          })
          console.log('1');
          break;
        case '2':
          this.quotes = data;
          console.log('2');
          break;
        case '3':
          this.quotes = data.map(item => {
            return {id: item['Quotes.ID'], quotation: item['Quotes.QUOTATION'], author: item['Quotes.AUTHOR']};
          })
          console.log('3');
          break;
        default:
          console.log('Error create quote');
          return null;
      }


      // if (data["Quotes.IOF_TESTOutput"]) {
      //   this.quotesIn = data["Quotes.IOF_TESTOutput"]["Quotes.row"];
      //   this.quotes = this.quotesIn.map(item => {
      //     return {id: item[0], quotation: item[1], author: item[2]};
      //   })
      //   console.log(this.quotes);
      // } else {
      //   console.log('***values = ', data);
      //   //this.quotesIn = data;


      //   this.quotes = data.map(item => {
      //     return {id: item['Quotes.ID'], quotation: item['Quotes.QUOTATION'], author: item['Quotes.AUTHOR']};
      //   })
      // }
      this.isDataAvailable = true;
    })
    console.log('');
  }

  delete(id) {
    this.crudService.delete(id).subscribe(res => {
      console.log('Quote id = ', id, ' deleted');
      location.reload();
    })
  }

  filterServices(filterId) {
    this.crudService.setServiceId(filterId);
    //location.reload();
//      alert('filterId = '+filterId);
  }

}
