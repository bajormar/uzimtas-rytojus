import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'ur-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    public form = new FormGroup({
        activityField: new FormControl()
    });

    constructor() { }

    ngOnInit() {}

}
