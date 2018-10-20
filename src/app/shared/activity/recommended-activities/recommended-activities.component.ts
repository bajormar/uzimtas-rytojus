import { Component, OnInit } from '@angular/core';
import {ActivityModel} from '../activity.model';
import {ActivityService} from '../activity.service';

@Component({
    selector: 'ur-recommended-activities',
    templateUrl: './recommended-activities.component.html',
    styleUrls: ['./recommended-activities.component.scss']
})
export class RecommendedActivitiesComponent implements OnInit {

    public activities: ActivityModel[] = [];

    constructor(private activityService: ActivityService) {}

    ngOnInit() {
        this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = [ ...activities ].splice(0, 6);
        });
    }

}
