import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

import {ProductService} from "../../../providers/product-service";
import {Order} from '../../../providers/order';

import {OrderProductListPage} from "./list";
import {OrderListPage} from "../list/list";

@Component({
    selector: 'page-product',
    templateUrl: 'product.html'
})
export class OrderProductPage {
    private product: FormGroup;
    private productId: string;
    private customer;
    private selectedProductsId: string[] = [];
    private totalPriceFromProducts: number;
    private orderId: string;

    public selectedProducts: Object[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                private formBuilder: FormBuilder,
                private orderService: Order,
                private productService: ProductService) {

        this.productId = navParams.get('productId');
        this.customer = navParams.get('customer');
        this.orderId = navParams.get('orderId');
        let order = navParams.get('order');
        let formParams = {
            totalPriceCurrency: ['rupiah', Validators.required],
            totalPriceValue: [0, Validators.required],
            shippingPriceCurrency: ['rupiah', Validators.required],
            shippingPriceValue: [0, Validators.required],
            discountCurrency: ['rupiah', Validators.required],
            discountValue: [0, Validators.required],
            paidFinished: [false, Validators.required]
        };
console.log(order);
console.log(this.customer);
console.log(this.productId);
        if(order){
            this.selectedProducts = order.Product;
            this.selectedProductsId = order.productId;
            this.customer = order.Customer;
            this.orderId = order.id;

            formParams.totalPriceCurrency[0] = order.totalPrice.currency;
            formParams.totalPriceValue[0] = order.totalPrice.value;
            formParams.shippingPriceCurrency[0] = order.shippingPrice.currency;
            formParams.shippingPriceValue[0] = order.shippingPrice.value;
            formParams.discountCurrency[0] = order.discount.currency;
            formParams.discountValue[0] = order.discount.value;
            formParams.paidFinished[0] = order.paidFinished;
        }else{
            if (this.productId) {
                this.selectedProductsId = JSON.parse(this.productId);
            }

            this.totalPriceFromProducts = 0;
            this.displaySelectedProduct();
        }

        this.product = this.formBuilder.group(formParams);
    }

    displaySelectedProduct() {
        if (this.selectedProductsId) {
            let params = {filter: {productId: JSON.stringify(this.selectedProductsId)}};
            this.productService.getProductWithFilter(params)
                .subscribe(products => {
                    this.selectedProducts = products;

                    for(let i=0; i<products.length; i++){
                        this.totalPriceFromProducts += Number(products[i].sellingPrice.value);
                    }
                    this.changeTotalPrice(0, false);
                });
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductPage');
    }

    displayProductList() {
        let params = {
            'customer': this.customer
        };
        if(this.selectedProductsId){
            params['selectedProductsId'] = JSON.stringify(this.selectedProductsId);
        }
        if(this.orderId){
            params['orderId'] = this.orderId;
        }
        this.navCtrl.push(OrderProductListPage, params);
    }

    changeTotalPrice(val, isMinus){console.log(val)
        if(isMinus){
            this.totalPriceFromProducts -= Number(val);
        } else{
            this.totalPriceFromProducts += Number(val);
        }

        this.product.value.totalPriceValue = this.totalPriceFromProducts.toString();
        console.log(this.totalPriceFromProducts);

        console.log(this.product)
    }

    onSave() {
        let orderForm = this.product.value;
        let newOrder = {
            customerId: this.customer.id,
            productId: JSON.stringify(this.selectedProductsId),
            shippingPrice: JSON.stringify({currency: orderForm.shippingPriceCurrency, value: orderForm.shippingPriceValue}),
            discount: JSON.stringify({currency: orderForm.discountCurrency, value: orderForm.discountValue}),
            totalPrice: JSON.stringify({currency: orderForm.totalPriceCurrency, value: orderForm.totalPriceValue}),
            paidFinished: orderForm.paidFinished
        };
console.log(newOrder);
        let toast = this.toastCtrl.create({
            message: 'order berhasil disave!',
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            this.navCtrl.push(OrderListPage);
        });
console.log(this.orderId);
        if(this.orderId){
            this.orderService.update(this.orderId, newOrder)
                .subscribe(success => {
                    if(success){
                        toast.present();
                    }
                });
        } else{
            this.orderService.add(newOrder)
                .subscribe(success => {
                    if(success){
                        toast.present();
                    }
                });
        }
    }
}
