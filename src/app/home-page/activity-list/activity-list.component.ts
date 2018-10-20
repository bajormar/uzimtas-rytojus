import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityModel} from '../../shared/activity/activity.model';
import {ActivityService} from '../../shared/activity/activity.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ur-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit, OnDestroy {

    activities: ActivityModel[];
    activitiesSubscription: Subscription;

    searchQuery: string;

    constructor(private activityService: ActivityService) {
    }

    ngOnInit() {
        this.activitiesSubscription = this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = activities;
        });
    }

    filterBySearchQuery() {
        this.activityService.filterBySearchQuery(this.searchQuery);
    }

    ngOnDestroy() {
        this.activitiesSubscription.unsubscribe();
    }

}
