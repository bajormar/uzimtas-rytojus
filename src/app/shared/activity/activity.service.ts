import {Injectable} from '@angular/core';
import {ActivityModel} from './activity.model';
import {ActivityType} from './activity-type.enum';
import {BehaviorSubject} from 'rxjs';
import {ActivityFilterModel} from './activity-filter.model';
import {Place} from './place.enum';
import {Gender} from './gender.enum';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private activitiesSubject = new BehaviorSubject<ActivityModel[]>(activitiesData);
    activitiesObservable = this.activitiesSubject.asObservable();

    private filtersSubject = new BehaviorSubject<ActivityFilterModel[]>(activityFiltersData);
    filtersObservable = this.filtersSubject.asObservable();

    constructor() {}

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
        const filter = this.filtersSubject.getValue().find(f => f.id === filterId);
        filter.selected = selected;
    }

    filterActivities() {
        const filters = this.filtersSubject.getValue();
        const typeFilters = filters.filter(f => f.type === 'type');
        const placeFilters = filters.filter(f => f.type === 'place');
        const timeFilters = filters.filter(f => f.type === 'time');
        const genderFilters = filters.filter(f => f.type === 'gender');

        const types = typeFilters.filter(f => f.selected).map(f => f.value);
        const places = placeFilters.filter(f => f.selected).map(f => f.value);
        const times = timeFilters.filter(f => f.selected).map(f => f.value);
        const genders = genderFilters.filter(f => f.selected).map(f => f.value);

        const activities = activitiesData.filter(a => {
            const typeMatches = types.length === 0 || types.includes(a.type);
            const placeMatches = places.length === 0 || places.includes(a.place);
            const timeMatches = times.length === 0 || times.some(time =>
                this.isActivityBeforeTime(a.date, time.from) && this.isActivityAfterTime(a.date, time.to)
            );
            const genderMatches = genders.length === 0 || a.gender.some(g => genders.includes(g));

            return typeMatches && placeMatches && timeMatches && genderMatches;
        });
        this.activitiesSubject.next(activities);
    }

    getActivity(activityId: number): ActivityModel {
        return activitiesData.find(a => a.id === activityId);
    }

    clearFilters() {
        const filters = this.filtersSubject.getValue().map(f => ({...f, selected: false}));
        this.filtersSubject.next(filters);
        this.activitiesSubject.next(activitiesData);
    }
}

const activitiesData = [
    new ActivityModel({
        name: 'Vilniaus futbolo mokykla "ŽAIBAS"',
        imageSrc: 'https://files.slack.com/files-pri/TDFFASP3Q-FDJDZU8LC/954719_546288298740096_398785001_n.jpg',
        type: ActivityType.FOOTBALL,
        description: 'Vilniaus FM "ŽAIBAS" ištakas reikėtų laikyti 2006 m. rudenį, kai buvo įkurta Vilniaus m. Žalgirio - A. Narbekovo futbolo mokykla, kadangi dauguma dabartinės mokyklos komandos sudaro buvę Žalgirio - A. Narbekovo futbolo mokyklos vaikai. Vilniaus FM "ŽAIBAS',
        price: 10,
        date: new Date(2018, 9, 25, 14, 12, 11, 0),
        duration: '1h',
        place: Place.ANTAKALNIS,
        gender: [Gender.MALE, Gender.FEMALE],
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
        type: ActivityType.VOLLEYBALL,
        description: 'Tinklinio treniruotės Vilniuje vyksta pagal specialią mėgėjams sudarytą programa. Tiklinis Vilniuje vis populiarėja. Tinklinis - treniruotės specialiai tau.',
        price: 50,
        date: new Date(2018, 9, 24, 17, 0, 0, 0),
        duration: '2h',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SENAMIESTIS,
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
        type: ActivityType.PAINT_BALL,
        description: 'Dažasvydis - tai yra greitas ir aktyvus žaidimas, kuriame žaidėjai arba komandos varžosi tarpusavyje kas eliminuos daugiau priešininkų, pažymint juos specialiais dažų kamuoliukais.',
        price: 0,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SAULETEKIS,
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
        type: ActivityType.SWIMMING_POOL,
        description: 'Pabėgimo kambarys „Užkoduota“ – tai erdvė, kurioje jūs būsite užrakinti ir, spręsdami galvosūkius, ieškodami užuominų ir pasitelkdami savo logiką, turėsite iš jo pabėgti.',
        price: 10,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1h',
        gender: [Gender.FEMALE],
        place: Place.ZIRMUNAI,
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
        type: ActivityType.ESCAPE_ROOM,
        description: 'Pabėgimo kambarys „Užkoduota“ – tai erdvė, kurioje jūs būsite užrakinti ir, spręsdami galvosūkius, ieškodami užuominų ir pasitelkdami savo logiką, turėsite iš jo pabėgti.',
        price: 40,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        gender: [Gender.MALE],
        place: Place.SAULETEKIS,
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
        type: ActivityType.ESCAPE_ROOM,
        description: 'Pabėgimo kambarys „Užkoduota“ – tai erdvė, kurioje jūs būsite užrakinti ir, spręsdami galvosūkius, ieškodami užuominų ir pasitelkdami savo logiką, turėsite iš jo pabėgti.',
        price: 40,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SAULETEKIS,
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
        type: ActivityType.DANCES,
        description: 'Šokių programa skirta jaunimui, suaugusiems bei senjorams. Išmokus keletą žingsnelių jau puikiai jausitės šokių pokyliuose ir vakarėliuose, o po 4-5 mėnesių jau galėsite dalyvauti ir hobi lygio varžybose',
        price: 0,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SAULETEKIS,
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
        type: ActivityType.PAINT_BALL,
        description: 'Dažasvydis - tai yra greitas ir aktyvus žaidimas, kuriame žaidėjai arba komandos varžosi tarpusavyje kas eliminuos daugiau priešininkų, pažymint juos specialiais dažų kamuoliukais.',
        price: 0,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SAULETEKIS,
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
        type: ActivityType.ESCAPE_ROOM,
        description: 'Vilniaus Senamiesčio rūsyje „Bėglys“ įkūrė naują galvosūkių ir pabėgimo kambarį – „Senoji Taverna“, kurioje įvairūs keliautojai paliko įvairių įdomių, keistų, kartais egzotiškų daiktų, surašė kelis mįslių tekstus',
        price: 35,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5h',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SAULETEKIS,
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

const typeFiltersData = [new ActivityFilterModel({
    name: ActivityType.FOOTBALL,
    type: 'type',
    value: ActivityType.FOOTBALL,
    selected: false
}), new ActivityFilterModel({
    name: ActivityType.VOLLEYBALL,
    type: 'type',
    value: ActivityType.VOLLEYBALL,
    selected: false
}), new ActivityFilterModel({
    name: ActivityType.DANCES,
    type: 'type',
    value: ActivityType.DANCES,
    selected: false
}), new ActivityFilterModel({
    name: ActivityType.PAINT_BALL,
    type: 'type',
    value: ActivityType.PAINT_BALL,
    selected: false
}), new ActivityFilterModel({
    name: ActivityType.ESCAPE_ROOM,
    type: 'type',
    value: ActivityType.ESCAPE_ROOM,
    selected: false
})];

const placeFiltersData = [new ActivityFilterModel({
    name: Place.ANTAKALNIS,
    type: 'place',
    value: Place.ANTAKALNIS,
    selected: false
}), new ActivityFilterModel({
    name: Place.SENAMIESTIS,
    type: 'place',
    value: Place.SENAMIESTIS,
    selected: false
}), new ActivityFilterModel({
    name: Place.SAULETEKIS,
    type: 'place',
    value: Place.SAULETEKIS,
    selected: false
}), new ActivityFilterModel({
    name: Place.ZIRMUNAI,
    type: 'place',
    value: Place.ZIRMUNAI,
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

const genderFiltersData = [new ActivityFilterModel({
    name: Gender.MALE,
    type: 'gender',
    value: Gender.MALE,
    selected: false
}), new ActivityFilterModel({
    name: Gender.FEMALE,
    type: 'gender',
    value: Gender.FEMALE,
    selected: false
})];

const activityFiltersData = [...typeFiltersData, ...placeFiltersData, ...timeFiltersData, ...genderFiltersData];
