import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Navbar, PopoverController} from 'ionic-angular';

import { ShowMenuPage } from './menu';

import { ProductService } from '../../providers/product-service';

@Component({
    selector: 'page-show',
    templateUrl: 'show.html'
})
export class ShowPage {
    @ViewChild(Navbar) navBar: Navbar;
    productId: String;
    product: Object;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public popoverCtrl: PopoverController,
                private productService: ProductService) {
        this.productId = navParams.get('productId');

        productService.showProduct(this.productId)
            .subscribe(product => {
                this.product = product;
                this.product['code'] = 'JN1231';

                console.log(this.product);
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ShowPage');

        this.navBar.backButtonClick = (e:UIEvent)=>{
            this.navCtrl.popToRoot();
        }
    }

    displayMenu(myEvent){
        let popover = this.popoverCtrl.create(ShowMenuPage);
        popover.present({
            ev: myEvent
        });
    }
}
