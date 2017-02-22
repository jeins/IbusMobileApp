import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Category {

    constructor(public http: Http) {
        console.log('Hello Category Provider');
    }

    getCategory() {
        return [
            'Tas',
            'Dompet',
            'Jam'
        ]
    }
}
