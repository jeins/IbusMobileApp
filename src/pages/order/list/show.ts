import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {OrderProductPage} from "../product/product";
import {Order} from "../../../providers/order";


@Component({
    selector: 'page-order-list-show',
    templateUrl: 'show.html'
})
export class OrderListShowPage {
    private order: Object;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private orderService: Order) {

        this.order = navParams.get('order');
        console.log(this.order);
    }

    showDetailOrder(){
        this.orderService.get(this.order['id'])
            .subscribe(order => {
                this.navCtrl.push(OrderProductPage, {order: order});
            });
    }
}