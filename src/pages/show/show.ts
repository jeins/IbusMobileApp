import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Navbar, PopoverController} from 'ionic-angular';

import { ShowMenuPage } from './menu';

@Component({
    selector: 'page-show',
    templateUrl: 'show.html'
})
export class ShowPage {
    @ViewChild(Navbar) navBar: Navbar;
    productId: String;
    product: Object;

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
        this.productId = navParams.get('productId');

        this.getProduct();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ShowPage');

        this.navBar.backButtonClick = (e:UIEvent)=>{
            this.navCtrl.popToRoot();
        }
    }

    private getProduct(){
        this.product = {
            code: 'JN123',
            name: 'Fossil',
            category: 'Tas',
            status: 'Baru',
            sellingPrice: {
                text: 'Rp 500.000'
            },
            purchasePrice: {
                text: '€ 50'
            },
            description: 'Hello World'
        };
    }

    displayMenu(myEvent){
        let popover = this.popoverCtrl.create(ShowMenuPage);
        popover.present({
            ev: myEvent
        });
    }
}
