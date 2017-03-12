import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Navbar} from 'ionic-angular';
import {Order} from "../../../providers/order";

import {OrderListShowPage} from "./show";


@Component({
    selector: 'page-order-list',
    templateUrl: 'list.html'
})
export class OrderListPage {
    @ViewChild(Navbar) navBar: Navbar;
    private products: Object[];
    private currentPage;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private orderService: Order) {

        this.currentPage = 1;
        this.products = [];

        orderService.list(6, this.currentPage)
            .subscribe(results => {
                let products = [];
                for(let i=0; i<results.length; i++){
                    let tmp = results[i]['Product'];

                    for(let j=0; j<tmp.length; j++) products.push(tmp[j]);
                }
                console.log(products);
                this.setupProductToGrid(products);
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ListPage');

        this.navBar.backButtonClick = (e: UIEvent) => {
            this.navCtrl.popToRoot();
        }
    }

    showDetailProduct(productId){
        this.orderService.getByProduct(productId)
            .subscribe(order => {
                this.navCtrl.push(OrderListShowPage, {order: order});
            });
    }

    private setupProductToGrid(products) {
        let tmpArr = [];
        let index = 0;
        let prodIndex = 0;

        for (let i = 0; i < products.length; i++) {
            if (i !== 0 && i % 2 == 0) {
                index = 0;
                tmpArr = [];

                this.products[prodIndex] = tmpArr;
                prodIndex++;
            }

            tmpArr[index] = products[i];
            index++;
        }
    }

}
