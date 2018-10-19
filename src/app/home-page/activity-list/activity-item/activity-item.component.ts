import {Component, Input, OnInit} from '@angular/core';
import {ActivityModel} from '../../../shared/activity/activity.model';

@Component({
    selector: 'ur-activity-item',
    templateUrl: './activity-item.component.html',
    styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

    @Input() activity: ActivityModel;

    constructor() {
    }

    ngOnInit() {
    }

}
