import {Component} from "@angular/core";
import {NavParams, NavController, AlertController} from "ionic-angular";
import {InputPage} from "../input/input";

import {ProductService} from '../../providers/product-service';
import {HomePage} from "../home/home";

@Component({
    template: `
    <ion-list>
      <button ion-item (click)="editProduct()">Edit</button>
      <button ion-item (click)="removeProduct()">Remove</button>
    </ion-list>
  `
})

export class ShowMenuPage {
    private productId;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                private productService: ProductService) {
      this.productId = navParams.get('productId');
    }

    editProduct(){
        console.log(this.productId);
        this.navCtrl.push(InputPage, {productId: this.productId})
    }

    removeProduct(){
        let confirm = this.alertCtrl.create({
            title: 'Remove Product',
            message: 'Yakin?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        this.productService.remove(this.productId)
                            .subscribe(result => {
                                console.log(result);
                                this.navCtrl.push(HomePage);
                            });
                    }
                }
            ]
        });
        confirm.present();
    }
}
