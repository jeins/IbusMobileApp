import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from '../../../providers/customer';
import {OrderProductPage} from "../product/product";

@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html'
})
export class OrderCustomerPage {
  private customer: FormGroup;
  private productId: string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private customerService: Customer) {

    this.productId = navParams.get('productId');
    this.customer = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      postcode: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCustomerPage');
  }

  onSave(){
    console.log(this.customer.value);

    this.customerService
      .register(this.customer.value)
      .subscribe(customerId => {
        console.log(customerId);
        let params = {
          customerId: customerId
        };

        if(this.productId) {
          params['productId'] = this.productId;
        }

        this.navCtrl.push(OrderProductPage, params);
      });
  }

}
