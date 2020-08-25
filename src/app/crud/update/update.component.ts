import {Component, OnInit} from '@angular/core';
import {CrudService} from '../crud.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Quote} from '../quote';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  quoteForm: FormGroup;
  id: any;
  paramsSub: any;
  quote: Quote;
  isDataAvailable: boolean = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public crudService: CrudService
  ) {

  }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe(
      params => (this.id = parseInt(params['quoteId'], 10))
    );

    console.log('id', this.id);

    this.crudService.getById(this.id).subscribe((data: Quote) => {
      let tempQuote: Quote;

      if (data["Quotes.AUTHOR"])
        tempQuote = {
          id: data["Quotes.ID"],
          quotation: data["Quotes.QUOTATION"],
          author: data["Quotes.AUTHOR"]
        };
      else
        tempQuote = {
          id: data["QuoteById.row"][0]["QuoteById.ID"],
          quotation: data["QuoteById.row"][0]["QuoteById.QUOTATION"],
          author: data["QuoteById.row"][0]["QuoteById.AUTHOR"]
        };

      this.quote = tempQuote;

      console.log(data);
      console.log('this.quote', this.quote);
      this.initializeFormModel();
      this.isDataAvailable = true;
    })
  }

  initializeFormModel() {
    this.quoteForm = this.fb.group({
      id: new FormControl(this.quote.id),
      quotation: new FormControl(this.quote.quotation),
      author: new FormControl(this.quote.author)
    })
  }

  submitForm() {
    this.crudService.update(this.quote.id, this.quoteForm.value).subscribe(res => {
      console.log('Quote id = ', this.quote.id);
      this.router.navigate(['/crud/home/']);
    })
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
