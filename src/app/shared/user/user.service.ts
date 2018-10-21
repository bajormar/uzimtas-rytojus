import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<UserModel>(userData);
    userObservable = this.userSubject.asObservable();

    constructor() {
        let user = this.userSubject.getValue();
        const userJson = localStorage.getItem('user');
        if (userJson) {
            user = JSON.parse(userJson);
            this.userSubject.next(user);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => {
                user.positionLatitude = position.coords.latitude;
                user.positionLongtitude = position.coords.longitude;
                this.userSubject.next(user);
            }));
        }
    }

    starActivity(activityId: number) {
        const user = this.userSubject.getValue();
        if (user.starredActivities.includes(activityId)) {
            user.starredActivities = user.starredActivities.filter(a => a !== activityId);
        } else {
            user.starredActivities = [...user.starredActivities, activityId];
        }

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }
}

const userData = new UserModel({
    name: 'Jonas',
    starredActivities: [],
});
