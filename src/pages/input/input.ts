import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/*
 Generated class for the Input page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-input',
    templateUrl: 'input.html'
})
export class InputPage {
    isAddBillImage: boolean;
    product: Object;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.isAddBillImage = false;
        this.product = {name: '', description: '', purchasePrice: {currency: 'euro'}, sellingPrice: {currency: 'rupiah'}}
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputPage');
    }

}
