import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import _ from 'lodash';

@Injectable()
export class ProductService {
    private _productApiUri;

    constructor(public http: Http) {
        console.log('Hello ProductService Provider');
        this.http = http;
        this._productApiUri = 'http://ibus.mjuan.me/product/';
    }

    public getProducts(limit, currentPage){
        return this.http.get(this._productApiUri + 'list/' + limit + '/' + currentPage )
            .map(res => this.checkProductData(res.json()))
            .catch(this.handleError);
    }

    public getProductWithFilter(params){
        let body = JSON.stringify(params);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._productApiUri + 'filter', body, options)
            .map(res => this.checkProductData(res.json()))
            .catch(this.handleError);
    }

    public getProductById(productId){
        return this.http.get(this._productApiUri + productId)
            .map(res => this.checkProductData(res.json()))
            .catch(this.handleError);
    }

    public updateProduct(productId, newProductData){
        let body = JSON.stringify(newProductData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this._productApiUri + 'update/' + productId, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public addNewProduct(product){
        let body = JSON.stringify(product);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._productApiUri + 'add', body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public remove(productId){
        return this.http.delete(this._productApiUri + 'delete/' + productId)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private checkProductData(objs){
        let checkImageAvailable = (obj)=>{
            if(_.hasIn(obj, 'image') && obj.image == ''){
                obj.image = 'http://ibus.mjuan.me/image/no-image/jpg';
            }
        };

        if(_.isArray(objs)){
            _.forEach(objs, (obj)=>{
                checkImageAvailable(obj);
            });
        } else{
            checkImageAvailable(objs);
        }
console.log(objs);
        return objs;
    }
}
