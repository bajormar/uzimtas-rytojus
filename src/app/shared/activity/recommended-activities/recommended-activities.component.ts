import {Component, Input, OnInit} from '@angular/core';
import {ActivityModel} from '../activity.model';

@Component({
    selector: 'ur-recommended-activities',
    templateUrl: './recommended-activities.component.html',
    styleUrls: ['./recommended-activities.component.scss']
})
export class RecommendedActivitiesComponent implements OnInit {

    @Input() activities: ActivityModel[];

    constructor() {}

    ngOnInit() {}

}
