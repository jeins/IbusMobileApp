import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { InputPage } from '../pages/input/input';
import { HistoryPage } from '../pages/history/history'

import { ProductService } from '../providers/product-service';
import { Category } from '../providers/category';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InputPage,
    HistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InputPage,
    HistoryPage
  ],
  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      ProductService, Category
  ]
})
export class AppModule {}
