import {Injectable} from '@angular/core';
import {ActivityModel} from './activity.model';
import {ActivityTypes} from './activity-types.enum';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private activities = [new ActivityModel({
        name: 'Vilniaus futbolo mokykla "ŽAIBAS"',
        imageSrc: 'https://cdn.images.express.co.uk/img/dynamic/67/590x/Heung-min-Son-925466.jpg',
        type: ActivityTypes.FOOTBALL,
        description: 'Vilniaus FM "ŽAIBAS" ištakas reikėtų laikyti 2006 m. rudenį, kai buvo įkurta Vilniaus m. Žalgirio - A. Narbekovo futbolo mokykla, kadangi dauguma dabartinės mokyklos komandos sudaro buvę Žalgirio - A. Narbekovo futbolo mokyklos vaikai. Vilniaus FM "ŽAIBAS',
        price: 10,
        date: new Date(2018, 9, 25, 14, 12, 11, 0),
        duration: '1h',
        place: 'Antakalnis',
        positionLongitude: 25.245184555401494,
        positionLatitude: 54.710794080190624
    }), new ActivityModel({
        name: 'Tinklinio akademija',
        imageSrc: 'https://g4.dcdn.lt/images/pix/delfi-tinklinio-turnyras-75293703.jpg',
        type: ActivityTypes.VOLLEYBALL,
        description: 'Tinklinio treniruotės Vilniuje vyksta pagal specialią mėgėjams sudarytą programa. Tiklinis Vilniuje vis populiarėja. Tinklinis - treniruotės specialiai tau.',
        price: 50,
        date: new Date(2018, 9, 24, 17, 0, 0, 0),
        duration: '2h',
        place: 'Senamiestis',
        positionLongitude: 25.289228886661476,
        positionLatitude: 54.71620389718555,
    }), new ActivityModel({
        name: 'Karibų šokių pamokos',
        imageSrc: 'http://www.satrijosklubas.lt/wp-content/uploads/Sokiai/Gatves-sokiai-vaikai-2.jpg',
        type: ActivityTypes.DANCES,
        description: 'Šokių programa skirta jaunimui, suaugusiems bei senjorams. Išmokus keletą žingsnelių jau puikiai jausitės šokių pokyliuose ir vakarėliuose, o po 4-5 mėnesių jau galėsite dalyvauti ir hobi lygio varžybose',
        price: 0,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        place: 'Sauletekis',
        positionLongitude: 25.290101077401772,
        positionLatitude: 54.69580304303838,
    })];

    private activitiesSubject = new BehaviorSubject<ActivityModel[]>(this.activities);
    activitiesObservable = this.activitiesSubject.asObservable();

    constructor() {
    }

    private isActivityBeforeTime(activityDate: Date, timeFrom: number) {
        const hours = activityDate.getHours();
        const minutes = activityDate.getMinutes();
        return hours * 60 + minutes > timeFrom;
    }

    private isActivityAfterTime(activityDate: Date, timeTo: number) {
        const hours = activityDate.getHours();
        const minutes = activityDate.getMinutes();
        return hours * 60 + minutes < timeTo;
    }

    filter(types: ActivityTypes[], places: string[], timeFrom: number, timeTo: number) {
        if (!types.length && !places.length) {
            this.activitiesSubject.next(this.activities);
            return;
        }
        const activities = this.activities.filter(a => {
            return types.includes(a.type) &&
                places.includes(a.place) &&
                this.isActivityBeforeTime(a.date, timeFrom) &&
                this.isActivityAfterTime(a.date, timeTo);
        });
        this.activitiesSubject.next(activities);
    }
}
