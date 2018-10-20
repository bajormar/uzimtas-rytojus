import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../shared/activity/activity.service';
import {ActivityModel} from '../shared/activity/activity.model';

@Component({
    selector: 'ur-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    public activities: ActivityModel[] = [];

    constructor(private activityService: ActivityService) { }

    ngOnInit() {
        this.activityService.clearFilters();

        this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = [ ...activities ].splice(0, 6);
        });
    }
}
