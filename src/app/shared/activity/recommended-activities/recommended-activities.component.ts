import {Component, Input, OnInit} from '@angular/core';
import {ActivityModel} from '../activity.model';
import {UserService} from '../../user/user.service';
import {UserModel} from '../../user/user.model';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }

    return array;
}

@Component({
    selector: 'ur-recommended-activities',
    templateUrl: './recommended-activities.component.html',
    styleUrls: ['./recommended-activities.component.scss'],
})
export class RecommendedActivitiesComponent implements OnInit {

    @Input() activities: ActivityModel[];
    shownActivities: ActivityModel[] = [];

    user: UserModel;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.userObservable.subscribe(user => {
            this.user = user;
        });

        this.shownActivities = shuffleArray([...this.activities]).slice(0, 6);
    }

    changeStarState(activityId: number) {
        this.userService.starActivity(activityId);
    }
}
