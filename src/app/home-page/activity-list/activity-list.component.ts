import {Component, OnInit} from '@angular/core';
import {ActivityModel} from '../../shared/activity/activity.model';

@Component({
    selector: 'ur-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

    activities = [new ActivityModel({
        name: 'Futbolas',
        description: 'Labai idomu, spardom kamuoli',
        price: 10,
        date: '2018/10/20',
        duration: '1h',
        place: 'Antakalnis',
    }), new ActivityModel({
        name: 'Tinklinis',
        description: 'Netiek idomu, dauzom kamuoli',
        price: 50,
        date: '2018/10/30',
        duration: '2h',
        place: 'Senamiestis',
    }), new ActivityModel({
        name: 'Sokiai',
        description: 'Super muzika',
        price: 0,
        date: '2018/10/21',
        duration: '1,5h',
        place: 'Sauletekis',
    })];

    constructor() {
    }

    ngOnInit() {
    }

}
