import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import { ProductService } from '../../providers/product-service';
import { Category } from '../../providers/category';
import { ShowPage } from '../show/show';

@Component({
    selector: 'page-input',
    templateUrl: 'input.html'
})
export class InputPage {
    isAddBillImage: boolean;
    product: Object;
    loadCategories: String[] = [];

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, private productService: ProductService, private category: Category) {
        this.productService = productService;
        this.isAddBillImage = false;
        this.product = {name: '', description: '', purchasePrice: {currency: 'euro'}, sellingPrice: {currency: 'rupiah'}};
        this.loadCategories = category.getCategory()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputPage');
    }

    onSaveInput() : void{
        let productId;
        let toast = this.toastCtrl.create({
            message: 'Berhasil menambahkan product baru',
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.navCtrl.push(ShowPage, {productId});
        });

        this.productService
            .addNewProduct(this.product)
            .subscribe(product => {
                console.log(product);
                productId = product.id;
                toast.present();
            });
    }
}
