import {Component, Input, OnInit} from '@angular/core';
import {ActivityModel} from '../activity.model';
import {UserService} from '../../user/user.service';
import {UserModel} from '../../user/user.model';

@Component({
    selector: 'ur-recommended-activities',
    templateUrl: './recommended-activities.component.html',
    styleUrls: ['./recommended-activities.component.scss'],
})
export class RecommendedActivitiesComponent implements OnInit {

    @Input() activities: ActivityModel[];

    user: UserModel;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.userObservable.subscribe(user => {
            this.user = user;
        });
    }

    changeStarState(activityId: number) {
        this.userService.starActivity(activityId);
    }
}
