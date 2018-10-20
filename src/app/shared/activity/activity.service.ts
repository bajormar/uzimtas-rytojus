import {Injectable} from '@angular/core';
import {ActivityModel} from './activity.model';
import {ActivityTypes} from './activity-types.enum';
import {BehaviorSubject} from 'rxjs';
import {ActivityFilterModel} from './activity-filter.model';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private activities = activitiesData;
    private filters = activityFiltersData;

    private activitiesSubject = new BehaviorSubject<ActivityModel[]>(this.activities);
    activitiesObservable = this.activitiesSubject.asObservable();

    private filtersSubject = new BehaviorSubject<ActivityFilterModel[]>(this.filters);
    filtersObservable = this.filtersSubject.asObservable();

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

    updateFilter(filterId: number, selected: boolean) {
        const filter = this.filters.find(f => f.id === filterId);
        filter.selected = selected;
    }

    filterActivities() {
        const typeFilters = this.filters.filter(f => f.type === 'type');
        const placeFilters = this.filters.filter(f => f.type === 'place');
        const timeFilters = this.filters.filter(f => f.type === 'time');

        const types = typeFilters.filter(f => f.selected).map(f => f.value);
        const places = placeFilters.filter(f => f.selected).map(f => f.value);
        const times = timeFilters.filter(f => f.selected).map(f => f.value);

        const activities = activitiesData.filter(a => {
            const typeMatches = types.length === 0 || types.includes(a.type);
            const placeMatches = places.length === 0 || places.includes(a.place);
            const timeMatches = times.length === 0 || times.some(time =>
                this.isActivityBeforeTime(a.date, time.from) && this.isActivityAfterTime(a.date, time.to)
            );
            return typeMatches && placeMatches && timeMatches;
        });
        this.activitiesSubject.next(activities);
    }

    getActivity(activityId: number): ActivityModel {
        return this.activities.find(a => a.id === activityId);
    }

    clearFilters() {
        this.filters = this.filters.map(f => ({...f, selected: false}));
        this.activitiesSubject.next(activitiesData);
    }
}

const activitiesData = [
    new ActivityModel({
        name: 'Vilniaus futbolo mokykla "ŽAIBAS"',
        imageSrc: 'https://files.slack.com/files-pri/TDFFASP3Q-FDJDZU8LC/954719_546288298740096_398785001_n.jpg',
        type: ActivityTypes.FOOTBALL,
        description: 'Vilniaus FM "ŽAIBAS" ištakas reikėtų laikyti 2006 m. rudenį, kai buvo įkurta Vilniaus m. Žalgirio - A. Narbekovo futbolo mokykla, kadangi dauguma dabartinės mokyklos komandos sudaro buvę Žalgirio - A. Narbekovo futbolo mokyklos vaikai. Vilniaus FM "ŽAIBAS',
        price: 10,
        date: new Date(2018, 9, 25, 14, 12, 11, 0),
        duration: '1h',
        place: 'Antakalnis',
        positionLongitude: 25.245184555401494,
        positionLatitude: 54.710794080190624,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Tinklinio akademija',
        imageSrc: 'https://files.slack.com/files-pri/TDFFASP3Q-FDJQYGWA1/volleyball.jpeg',
        type: ActivityTypes.VOLLEYBALL,
        description: 'Tinklinio treniruotės Vilniuje vyksta pagal specialią mėgėjams sudarytą programa. Tiklinis Vilniuje vis populiarėja. Tinklinis - treniruotės specialiai tau.',
        price: 50,
        date: new Date(2018, 9, 24, 17, 0, 0, 0),
        duration: '2h',
        place: 'Senamiestis',
        positionLongitude: 25.289228886661476,
        positionLatitude: 54.71620389718555,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Sostinės krepšinio akademija',
        imageSrc: 'https://files.slack.com/files-pri/TDFFASP3Q-FDHSUKG64/final_zaid3.jpg',
        type: ActivityTypes.BASKETBALL,
        description: 'Dažasvydis - tai yra greitas ir aktyvus žaidimas, kuriame žaidėjai arba komandos varžosi tarpusavyje kas eliminuos daugiau priešininkų, pažymint juos specialiais dažų kamuoliukais.',
        price: 0,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        place: 'Sauletekis',
        positionLongitude: 25.27398647019848,
        positionLatitude: 54.71189442459348,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        imageSrc: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fg3.dcdn.lt%2Fimages%2Fpix%2Ftreniruote-plaukimo-baseine-62335895.jpg',
        name: 'Baseinas "Olimpinė pradžia"',
        type: ActivityTypes.SWIMMING_POOL,
        description: 'Pabėgimo kambarys „Užkoduota“ – tai erdvė, kurioje jūs būsite užrakinti ir, spręsdami galvosūkius, ieškodami užuominų ir pasitelkdami savo logiką, turėsite iš jo pabėgti.',
        price: 10,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1h',
        place: 'Žirmūnai',
        positionLongitude: 25.299615559754074,
        positionLatitude: 54.71077170084095,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        imageSrc: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fg1.dcdn.lt%2Fimages%2Fpix%2Fmoteru-tenisas-68376474.jpg',
        name: 'Tenisas po pamokų',
        type: ActivityTypes.ESCAPE_ROOM,
        description: 'Pabėgimo kambarys „Užkoduota“ – tai erdvė, kurioje jūs būsite užrakinti ir, spręsdami galvosūkius, ieškodami užuominų ir pasitelkdami savo logiką, turėsite iš jo pabėgti.',
        price: 40,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        place: 'Sauletekis',
        positionLongitude: 25.253225457843115,
        positionLatitude: 54.712196205016056,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Pabėgimo kambarys - galvosūkiai',
        imageSrc: 'https://www.laisvalaikiodovanos.lt/public/photos/products/09/22/25/64566_photo_r.jpg?version=1506675112',
        type: ActivityTypes.ESCAPE_ROOM,
        description: 'Pabėgimo kambarys „Užkoduota“ – tai erdvė, kurioje jūs būsite užrakinti ir, spręsdami galvosūkius, ieškodami užuominų ir pasitelkdami savo logiką, turėsite iš jo pabėgti.',
        price: 40,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        place: 'Sauletekis',
        positionLongitude: 25.24709701540803,
        positionLatitude: 54.70899092953229,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
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
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Dažasvydis',
        imageSrc: 'https://legionas.lt/wp-content/uploads/2016/02/522546_10150663069913751_1032937692_n.jpg',
        type: ActivityTypes.PAINT_BALL,
        description: 'Dažasvydis - tai yra greitas ir aktyvus žaidimas, kuriame žaidėjai arba komandos varžosi tarpusavyje kas eliminuos daugiau priešininkų, pažymint juos specialiais dažų kamuoliukais.',
        price: 0,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        place: 'Sauletekis',
        positionLongitude: 25.27398647019848,
        positionLatitude: 54.71189442459348,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Pabėgimo kambarys - galvosūkiai',
        imageSrc: 'https://www.visainfo.lt/media/k2/items/cache/cf8018b7fa2fcee05057522dc61f4a72_L.jpg',
        type: ActivityTypes.ESCAPE_ROOM,
        description: 'Vilniaus Senamiesčio rūsyje „Bėglys“ įkūrė naują galvosūkių ir pabėgimo kambarį – „Senoji Taverna“, kurioje įvairūs keliautojai paliko įvairių įdomių, keistų, kartais egzotiškų daiktų, surašė kelis mįslių tekstus',
        price: 35,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        place: 'Sauletekis',
        positionLongitude: 25.273415407973545,
        positionLatitude: 54.705213007921884,
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    })
];

const typeFiltersData = [
    new ActivityFilterModel({
        name: 'Futbolas',
        type: 'type',
        value: ActivityTypes.FOOTBALL,
        selected: false
    }),
    new ActivityFilterModel({
        name: 'Krepšinis',
        type: 'type',
        value: ActivityTypes.BASKETBALL,
        selected: false
    }),
    new ActivityFilterModel({
        name: 'Tinklinis',
        type: 'type',
        value: ActivityTypes.VOLLEYBALL,
        selected: false
    }),
    new ActivityFilterModel({
        name: 'Šokiai',
        type: 'type',
        value: ActivityTypes.DANCES,
        selected: false
    }),
    new ActivityFilterModel({
        name: 'Dažasvydis',
        type: 'type',
        value: ActivityTypes.PAINT_BALL,
        selected: false
    }),
    new ActivityFilterModel({
        name: 'Pabėgimo kambarys',
        type: 'type',
        value: ActivityTypes.ESCAPE_ROOM,
        selected: false
    })
];

const placeFiltersData = [new ActivityFilterModel({
    name: 'Antakalnis',
    type: 'place',
    value: 'Antakalnis',
    selected: false
}), new ActivityFilterModel({
    name: 'Senamiestis',
    type: 'place',
    value: 'Senamiestis',
    selected: false
}), new ActivityFilterModel({
    name: 'Sauletekis',
    type: 'place',
    value: 'Sauletekis',
    selected: false
})];

const timeFiltersData = [new ActivityFilterModel({
    name: '08:00 - 12:00',
    type: 'time',
    value: {from: 8 * 60, to: 12 * 60},
    selected: false
}), new ActivityFilterModel({
    name: '12:00 - 16:00',
    type: 'time',
    value: {from: 12 * 60, to: 16 * 60},
    selected: false
}), new ActivityFilterModel({
    name: '16:00 - 20:00',
    type: 'time',
    value: {from: 16 * 60, to: 20 * 60},
    selected: false
}), new ActivityFilterModel({
    name: '20:00 - 24:00',
    type: 'time',
    value: {from: 20 * 60, to: 24 * 60},
    selected: false
})];

const activityFiltersData = [...typeFiltersData, ...placeFiltersData, ...timeFiltersData];
