import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Quote } from '../quote';
import { Location } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quotes: Quote[] = [];
  isDataAvailable:boolean = false;

  constructor(private location: Location,
    public crudService: CrudService) { }

  ngOnInit() {
    console.log("home.ngOnInit");
    this.crudService.getAll().subscribe((data: Quote[])=>{
      console.log('data',data);
      if(data["Quotes.row"])
        this.quotes = data["Quotes.row"];
      else
        this.quotes = data;

      this.isDataAvailable = true;
    })
  }

  delete(id) {
    this.crudService.delete(id).subscribe(res => {
        console.log('Quote id = ',id,' deleted');
        location.reload();
      })
    }

    filterServices(filterId) {
      this.crudService.setServiceId(filterId);
      location.reload();
//      alert('filterId = '+filterId);
    }

}
