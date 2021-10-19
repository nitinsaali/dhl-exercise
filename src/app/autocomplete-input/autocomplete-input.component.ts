import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
  private unsubscribe: Subject<any> = new Subject<any>();
  public countrySearch: FormControl = new FormControl('');
  public countryList = [];
  constructor(private http: HttpClient, private renderer: Renderer2, private elementRef:ElementRef) { }
  private API_URL = 'https://616e9084715a630017b39692.mockapi.io/';

  ngOnInit(): void {
    this.searchFromRemoteData();
  }

  searchFromRemoteData() {
    this.countrySearch.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      ).subscribe(searchTerm => {
        const control = this.elementRef.nativeElement.querySelector('.control') as HTMLElement;
        this.renderer.addClass(control, 'is-loading');
        this.getData(searchTerm);
    });
  }

  getData(searchTerm: string) {
    this.getHttpRequest(searchTerm)
      .pipe(
        takeUntil(this.unsubscribe),
        map((data:any) => {
          this.countryList = data;
        })
    ).subscribe();
  }

  getHttpRequest(searchTerm: string) {
    //Since custom api doesn't support query string calling it normal way

    //return this.http.get(`${this.API_URL}/countries?q=${searchTerm}`);
    return this.http.get(`${this.API_URL}/countries`);
  }
}
