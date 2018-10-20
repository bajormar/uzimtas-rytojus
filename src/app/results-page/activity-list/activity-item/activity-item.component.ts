import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivityModel} from '../../../shared/activity/activity.model';
import {UserModel} from '../../../shared/user/user.model';

@Component({
    selector: 'ur-activity-item',
    templateUrl: './activity-item.component.html',
    styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {

    @Input() activity: ActivityModel;
    @Input() user: UserModel;

    @Output() starClick = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }
}
