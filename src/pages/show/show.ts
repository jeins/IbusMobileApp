import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Navbar} from 'ionic-angular';

@Component({
    selector: 'page-show',
    templateUrl: 'show.html'
})
export class ShowPage {
    @ViewChild(Navbar) navBar: Navbar;
    productId: String;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.productId = navParams.get('productId');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ShowPage');
        this.navBar.backButtonClick = (e:UIEvent)=>{
            this.navCtrl.popToRoot();
        }
    }

}
