import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InputPage } from '../input/input';
import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputPage = InputPage;
  historyPage = HistoryPage;

  constructor(public navCtrl: NavController) {
    
  }

}
