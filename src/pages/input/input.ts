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
    private productId;
    private isEdit;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                private productService: ProductService,
                private category: Category) {

        this.productId = navParams.get('productId');
        this.productService = productService;
        this.isAddBillImage = false;
        this.product = {name: '', description: '', purchasePrice: {currency: 'euro'}, sellingPrice: {currency: 'rupiah'}};
        this.loadCategories = category.getCategory();
        this.isEdit = !!(this.productId);

        if(this.isEdit) this.loadProduct();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputPage');
    }

    onSaveInput() : void{
        let productId;
        let toast = this.toastCtrl.create({
            message: 'product berhasil disave!',
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.navCtrl.push(ShowPage, {productId});
        });

        if(this.isEdit){
            this.productService
                .updateProduct(this.productId, this.product)
                .subscribe(product => {
                    console.log(product);
                    productId = product.id;
                    toast.present();
                });
        } else{
            this.productService
                .addNewProduct(this.product)
                .subscribe(product => {
                    console.log(product);
                    productId = product.id;
                    toast.present();
                });
        }
    }

    private loadProduct(){
        this.productService.getProductById(this.productId)
            .subscribe(product => {
                this.product = product;

                console.log(this.product);
            });
    }
}
