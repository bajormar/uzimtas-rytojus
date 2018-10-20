import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../shared/activity/activity.service';
import {ActivityModel} from '../shared/activity/activity.model';

@Component({
    selector: 'ur-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    public backgroundImage;

    public activities: ActivityModel[] = [];

    constructor(private activityService: ActivityService) {
    }

    ngOnInit() {
        this.activityService.clearFilters();

        this.backgroundImage = backgroundImages[this.getRndInteger(0, 7)];

        this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = activities;
        });
    }

    public getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

const backgroundImages = [
    'https://images.unsplash.com/photo-1502904550040-7534597429ae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d9575e86751b65d41da8dfe6f09e23a&auto=format&fit=crop&w=1549&q=80',
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=41900ca14b1acd536efbaf79f09e2632&auto=format&fit=crop&w=750&q=80',
    'https://images.unsplash.com/photo-1509255929945-586a420363cf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1837886ce541e402e3945f937c3afe08&auto=format&fit=crop&w=1501&q=80',
    'https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec2bdc92a9687b6af5089b335691830e&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4bfa13437e17634e0e4a9213cb7acbfa&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1461567933755-6c82be2197da?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef4ea123e771440e3633c877e1ee060d&auto=format&fit=crop&w=1489&q=80',
    '/assets/images/landing-image-1.jpg'
];
