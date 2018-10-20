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
        const userJson = localStorage.getItem('user');
        if (userJson) {
            this.userSubject.next(JSON.parse(userJson));
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
