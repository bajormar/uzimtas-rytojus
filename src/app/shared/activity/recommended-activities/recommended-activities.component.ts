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

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d * 100) / 100;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
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

    distances = {};

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.shownActivities = shuffleArray([...this.activities]).slice(0, 6);

        this.userService.userObservable.subscribe(user => {
            this.user = user;

            if (!user.positionLatitude || !user.positionLongtitude) {
                return;
            }

            this.distances = this.activities.reduce((acc, a) => {
                const distance = getDistanceFromLatLonInKm(user.positionLatitude, user.positionLongtitude, a.positionLatitude, a.positionLongitude);
                acc[a.id] = distance;
                return acc;
            }, {});

            const sorted = [...this.activities].sort((a, b) => {
                const distance1 = this.distances[a.id];
                const distance2 = this.distances[b.id];

                return distance1 - distance2;
            });

            this.shownActivities = shuffleArray(sorted).slice(0, 6);
        });
    }

    changeStarState(activityId: number) {
        this.userService.starActivity(activityId);
    }
}
