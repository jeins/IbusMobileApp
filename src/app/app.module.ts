import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { HomeMenuPage } from '../pages/home/menu';
import { InputPage } from '../pages/input/input';
import { HistoryPage } from '../pages/history/history';

import { ShowPage } from '../pages/show/show';
import { ShowMenuPage } from '../pages/show/menu';

import { OrderCustomerPage } from '../pages/order/customer/customer';
import { OrderProductPage } from '../pages/order/product/product';

import { ProductService } from '../providers/product-service';
import { Category } from '../providers/category';
import { Customer } from '../providers/customer';
import { Order } from "../providers/order";

@NgModule({
  declarations: [
    MyApp,
    HomePage, HomeMenuPage,
    InputPage,
    HistoryPage,
    ShowPage, ShowMenuPage,
    OrderCustomerPage, OrderProductPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, HomeMenuPage,
    InputPage,
    HistoryPage,
    ShowPage, ShowMenuPage,
    OrderCustomerPage, OrderProductPage
  ],
  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      ProductService, Category, Customer, Order
  ]
})
export class AppModule {}
