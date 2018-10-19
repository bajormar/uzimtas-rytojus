import {Injectable} from '@angular/core';
import {ActivityModel} from './activity.model';
import {ActivityTypes} from './activity-types.enum';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private activities = [new ActivityModel({
        name: 'Futbolas kosmose',
        type: ActivityTypes.FOOTBALL,
        description: 'Labai idomu, spardom kamuoli',
        price: 10,
        date: '2018/10/20',
        duration: '1h',
        place: 'Antakalnis',
    }), new ActivityModel({
        name: 'Tinklinis ant smelio',
        type: ActivityTypes.VOLLEYBALL,
        description: 'Netiek idomu, dauzom kamuoli',
        price: 50,
        date: '2018/10/30',
        duration: '2h',
        place: 'Senamiestis',
    }), new ActivityModel({
        name: 'Lotynu sokiai',
        type: ActivityTypes.DANCES,
        description: 'Super muzika',
        price: 0,
        date: '2018/10/21',
        duration: '1,5h',
        place: 'Sauletekis',
    })];

    private activitiesSubject = new BehaviorSubject<ActivityModel[]>(this.activities);
    activitiesObservable = this.activitiesSubject.asObservable();

    constructor() {
    }

    filterByTypes(types: ActivityTypes[]) {
        if (!types.length) {
            this.activitiesSubject.next(this.activities);
            return;
        }
        this.activitiesSubject.next(this.activities.filter(a => types.includes(a.type)));
    }
}
