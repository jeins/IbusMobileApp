import {Component} from '@angular/core';
import {
    NavController,
    NavParams,
    ToastController,
    ActionSheetController,
    Platform,
    LoadingController
} from 'ionic-angular';

import {ProductService} from '../../providers/product-service';
import {Category} from '../../providers/category';
import {ShowPage} from '../show/show';

import {ImageHandler} from '../../helper/image-handler';

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
    productImageHandler: ImageHandler;
    billImageHandler: ImageHandler;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public platform: Platform,
                public loadingCtrl: LoadingController,
                private productService: ProductService,
                private category: Category) {

        this.productId = navParams.get('productId');
        this.productService = productService;
        this.isAddBillImage = false;
        this.product = {
            name: '',
            description: '',
            purchasePrice: {currency: 'euro'},
            sellingPrice: {currency: 'rupiah'}
        };
        this.loadCategories = category.getCategory();
        this.isEdit = !!(this.productId);

        this.productImageHandler = new ImageHandler(toastCtrl, actionSheetCtrl, platform, loadingCtrl);
        this.billImageHandler = new ImageHandler(toastCtrl, actionSheetCtrl, platform, loadingCtrl);

        if (this.isEdit) this.loadProduct();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputPage');
    }

    displayImage(){
        if(!this.product['image']){
            return this.productImageHandler.pathForImage();
        } else{
            return this.product['image'];
        }
    }

    displayBillImage(){
        if(!this.product['billImage']){
            return this.billImageHandler.pathForImage();
        } else{
            return this.product['billImage'];
        }
    }

    onSaveInput(): void {
        if(this.productImageHandler.imageFileName) this.product['image'] = this.productImageHandler.imageFileName;
        if(this.billImageHandler.imageFileName) this.product['billImage'] = this.billImageHandler.imageFileName;

        let productId;
        let toast = this.toastCtrl.create({
            message: 'product berhasil disave!',
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.navCtrl.push(ShowPage, {productId});
        });

        if (this.isEdit) {
            this.productService
                .updateProduct(this.productId, this.product)
                .subscribe(success => {
                    console.log(success);
                    if (success) {
                        productId = this.productId;
                        toast.present();
                    }
                });
        } else {
            this.productService
                .addNewProduct(this.product)
                .subscribe(product => {
                    console.log(product);
                    productId = product.id;
                    toast.present();
                });
        }
    }

    private loadProduct() {
        this.productService.getProductById(this.productId)
            .subscribe(product => {
                this.product = product;

                this.billImageHandler.setImageFile(product.billImage);
                this.productImageHandler.setImageFile(product.image);

                console.log(this.product);
            });
    }
}
