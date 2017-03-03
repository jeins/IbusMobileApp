import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {ProductService} from "../../../providers/product-service";
import { Order } from '../../../providers/order';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class OrderProductPage {
  private product: FormGroup;
  private productId: string;
  private customerId: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  onSave(){
    console.log(this.product.value);
  }
}
