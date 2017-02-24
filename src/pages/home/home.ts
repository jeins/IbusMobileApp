import { Component } from '@angular/core';
import {PopoverController, NavController} from 'ionic-angular';
import _ from 'lodash';

import { InputPage } from '../input/input';
import { HistoryPage } from '../history/history';
import { HomeMenuPage } from './menu';
import {ShowPage} from '../show/show';

import { ProductService } from '../../providers/product-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputPage = InputPage;
  historyPage = HistoryPage;
  public products: Object[] = [];
  private currentPage;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              private productService: ProductService) {

    this.currentPage = 1;

    productService.getProducts(3, this.currentPage)
      .subscribe(products => {
        this.products = products;
      });
  }

  displayMenu(myEvent){
    let popover = this.popoverCtrl.create(HomeMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  loadMoreProduct(infiniteScroll){
    this.currentPage++;

    setTimeout(() => {
      this.productService.getProducts(3, this.currentPage)
        .subscribe(products => {
          _.forEach(products, (product)=>{
            this.products.push(product);
          });
        });


      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  showProduct(productId: string){
    this.navCtrl.push(ShowPage, {productId})
  }
}
