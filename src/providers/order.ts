import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class Order {
    private orderApiUri;

    constructor(public http: Http) {
        console.log('Hello Order Provider');
        this.http = http;
        this.orderApiUri = 'http://ibus.mjuan.me/order/';
    }

    add(order) {
        let body = JSON.stringify(order);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.orderApiUri, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    list(limit, currentPage){
        return this.http.get(this.orderApiUri + 'list/' + limit + '/' + currentPage )
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
