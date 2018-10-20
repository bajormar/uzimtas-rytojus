import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'ur-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    host: {
        class: 'd-flex flex-fill h-100'
    }
})
export class HomePageComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
