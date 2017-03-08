import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ProductService} from '../../../providers/product-service';
import {OrderProductPage} from "./product";


@Component({
    selector: 'page-product-list',
    templateUrl: 'list.html'
})
export class OrderProductListPage {
    private products;
    private selectedProductsId: string[] = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private productService: ProductService) {

        this.selectedProductsId = navParams.get('selectedProductsId');

        this.initData();
    }

    private initData(){
        this.productService.getProducts(100, 1)
            .subscribe(products => {
                this.products = products;
            });
    }

    onSelected(productId){
        this.selectedProductsId.push(productId);
        this.navCtrl.push(OrderProductPage ,{productId: this.selectedProductsId});
    }

    getItems(ev){
        this.initData();

        let val = ev.target.value;

        if (val && val.trim() != '') {
            this.products = this.products.filter((product) => {
                return (product.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
}