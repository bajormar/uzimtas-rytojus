import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityModel} from '../../shared/activity/activity.model';
import {ActivityService} from '../../shared/activity/activity.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../shared/user/user.service';
import {UserModel} from '../../shared/user/user.model';

@Component({
    selector: 'ur-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit, OnDestroy {

    activities: ActivityModel[];
    activitiesSubscription: Subscription;

    user: UserModel;

    constructor(private activityService: ActivityService, private userService: UserService) {
    }

    ngOnInit() {
        this.activitiesSubscription = this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = activities;
        });

        this.userService.userObservable.subscribe(user => {
            this.user = user;
        });
    }

    changeStarState(activityId: number) {
        this.userService.starActivity(activityId);
    }

    ngOnDestroy() {
        this.activitiesSubscription.unsubscribe();
    }

}
