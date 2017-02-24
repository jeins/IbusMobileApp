import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class ProductService {
    private _productApiUri;

    constructor(public http: Http) {
        console.log('Hello ProductService Provider');
        this.http = http;
        this._productApiUri = 'http://localhost:3000/product/';
    }

    public getProducts(limit, currentPage){
        return this.http.get(this._productApiUri + 'list/' + limit + '/' + currentPage )
            .map(res => res.json())
            .catch(this.handleError);
    }

    public addNewProduct(product){
        let body = JSON.stringify(product);console.log(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._productApiUri + 'add', body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
