import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class Customer {
  private customerApiUri;

  constructor(public http: Http) {
    console.log('Hello Customer Provider');
    this.http = http;
    this.customerApiUri = 'http://ibus.mjuan.me/customer/';
  }

  register(customer){
    let body = JSON.stringify(customer);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.customerApiUri, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
