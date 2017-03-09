import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from "../../../providers/product-service";
import {Order} from '../../../providers/order';
import {OrderProductListPage} from "./list";
import {HomePage} from "../../home/home";
import {OrderListPage} from "../list/list";

@Component({
    selector: 'page-product',
    templateUrl: 'product.html'
})
export class OrderProductPage {
    private product: FormGroup;
    private productId: string;
    private customerId: string;
    private selectedProductsId: string[] = [];

    public selectedProducts: Object[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                private formBuilder: FormBuilder,
                private orderService: Order,
                private productService: ProductService) {

        this.productId = navParams.get('productId');
        this.customerId = navParams.get('customerId');
        this.product = this.formBuilder.group({
            totalPriceCurrency: ['rupiah', Validators.required],
            totalPriceValue: ['', Validators.required],
            shippingPriceCurrency: ['rupiah', Validators.required],
            shippingPriceValue: ['', Validators.required],
            discountCurrency: ['rupiah', Validators.required],
            discountValue: ['', Validators.required],
            paidFinished: [false, Validators.required]
        });

        if (this.productId) {
            this.selectedProductsId.push(this.productId);
        }

        this.displaySelectedProduct();
    }

    displaySelectedProduct() {
        if (this.selectedProductsId) {
            let params = {filter: {productId: JSON.stringify(this.selectedProductsId)}};
            this.productService.getProductWithFilter(params)
                .subscribe(products => {
                    this.selectedProducts = products;
                });
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductPage');
    }

    displayProductList() {
        let params = {};
        if(this.selectedProductsId){
            params['selectedProductsId'] = this.selectedProductsId;
        }
        this.navCtrl.push(OrderProductListPage, params);
    }

    onSave() {
        let orderForm = this.product.value;
        let newOrder = {
            userId: this.customerId,
            productId: JSON.stringify(this.selectedProductsId),
            shippingPrice: JSON.stringify({currency: orderForm.shippingPriceCurrency, value: orderForm.shippingPriceValue}),
            discount: JSON.stringify({currency: orderForm.discountCurrency, value: orderForm.discountValue}),
            totalPrice: JSON.stringify({currency: orderForm.totalPriceCurrency, value: orderForm.totalPriceValue}),
            paidFinished: orderForm.paidFinished
        };

        let toast = this.toastCtrl.create({
            message: 'order berhasil disave!',
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.navCtrl.push(OrderListPage);
        });

        this.orderService.add(newOrder)
            .subscribe(success => {
            if(success){
                toast.present();
            }
        });
    }
}
