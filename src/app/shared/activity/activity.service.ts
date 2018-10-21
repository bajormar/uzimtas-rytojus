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
        const filters = [...this.filtersSubject.getValue()];
        const filter = filters.find(f => f.id === filterId);
        filter.selected = selected;
        this.filtersSubject.next(filters);
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
        name: 'Vilniaus futbolo mokykla',
        imageSrc: 'https://files.slack.com/files-pri/TDFFASP3Q-FDJDZU8LC/954719_546288298740096_398785001_n.jpg',
        type: ActivityType.FOOTBALL,
        description: 'Vilniaus futbolo mokykloje treniruotes lanko apie 600 mokinių. Iš viso sudarytos 39 įvairaus amžiaus grupės. Treniruotės vyksta Fabijoniškių vidurinės mokykloje',
        price: 10,
        date: new Date(2018, 9, 25, 14, 30, 0, 0),
        duration: '1 val',
        place: Place.ANTAKALNIS,
        gender: [Gender.MALE, Gender.FEMALE],
        positionLongitude: 25.314211,
        positionLatitude: 54.718006,
        address: 'Antakalnio g. 2, Vilnius',
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
        duration: '2 val',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SENAMIESTIS,
        positionLongitude: 25.282840,
        positionLatitude: 54.687745,
        address: 'Gedimino pr 9, Vilnius',
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Krepšinio treniruotė "Super talentas"',
        imageSrc: 'https://files.slack.com/files-pri/TDFFASP3Q-FDHSUKG64/final_zaid3.jpg',
        type: ActivityType.BASKETBALL,
        description: 'Treneriai ir dalyvaujantys svečiai ves krepšinio treniruotes visiems susidomėjusiems krepšiniu, kiekvienas atvykęs bus supažindintas su krepšinio technika, turės galimybę dalyvauti varžybose vienas prieš vieną bei išbandyti laimę metimų konkursuose.',
        price: 5,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1,5 val',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.ANTAKALNIS,
        positionLongitude: 25.315050,
        positionLatitude: 54.694899,
        address: 'Mildos g. 13 , Vilnius',
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Baseinas "Olimpinė pradžia"',
        imageSrc: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fg3.dcdn.lt%2Fimages%2Fpix%2Ftreniruote-plaukimo-baseine-62335895.jpg',
        type: ActivityType.SWIMMING_POOL,
        description: 'Mūsų baseinas „Olimpinė Pradžia“ yra prijungtas prie Vilniaus Gerosios Vilties vidurinės mokyklos pastato. Automobiliu iki baseino galima atvažiuoti iš Naugarduko gatvės pasukant į Skroblų gatvę ir apvažiavus Skroblų g. 19 pastatą kairėje pusėje matysis vidurinė mokykla. Apvažiavus mokyklą įvažiuosite į baseino automobilių stovėjimo aikštelę.',
        price: 10,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '1 val',
        gender: [Gender.FEMALE],
        place: Place.ZIRMUNAI,
        positionLongitude: 25.307802,
        positionLatitude: 54.716567,
        address: 'Žirmūnų g. 86, LT-06318 Vilnius',
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'SEB Arena - Tenisas',
        imageSrc: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fg1.dcdn.lt%2Fimages%2Fpix%2Fmoteru-tenisas-68376474.jpg',
        type: ActivityType.TENNIS,
        description: 'SEB arena – daugiafunkcinis sporto, paslaugų ir sveikatingumo centras visai šeimai. Tai didžiausias uždarų teniso kortų centras Baltijos šalyse, kuriame įrengta 14 vidaus HARD teniso aikštelių, 6 vidaus kiliminės dangos aikštelės, 4 lauko HARD teniso aikštelės ir 4 lauko dirbtinės žolės teniso aikštelės',
        price: 40,
        date: new Date(2018, 9, 23, 20, 0, 0, 0),
        duration: '1,5 val',
        gender: [Gender.MALE],
        place: Place.VIRSULISKES,
        positionLongitude: 25.234854,
        positionLatitude: 54.707043,
        address: 'Ažuolyno g. 9, Vilnius',
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'SEB arena - skvošas',
        imageSrc: 'http://www.viss.lt/dati/zanzibara/zanzibara%20(6).jpg',
        type: ActivityType.SQUASH,
        description: 'Vis daugiau susidomėjimo Lietuvoje sulaukiantis skvošas pasižymi tuo, kad čia lygiai gali kovoti ir vyrai, ir moterys. Nes svarbiausia – ne jėga, o mąstymas',
        price: 40,
        date: new Date(2018, 9, 23, 19, 0, 0, 0),
        duration: '2 val',
        gender: [Gender.FEMALE],
        place: Place.VIRSULISKES,
        positionLongitude: 25.234854,
        positionLatitude: 54.707043,
        address: 'Ažuolyno g. 9, Vilnius',
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
        date: new Date(2018, 9, 23, 21, 0, 0, 0),
        duration: '1,5 val',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.ZIRMUNAI,
        positionLongitude: 25.296019,
        positionLatitude: 54.705339,
        address: 'P.Žadeikos g. 2, LT-06318 Vilnius',
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Paintball Vilnius',
        imageSrc: 'https://legionas.lt/wp-content/uploads/2016/02/522546_10150663069913751_1032937692_n.jpg',
        type: ActivityType.PAINT_BALL,
        description: 'Dažasvydis - tai yra greitas ir aktyvus žaidimas, kuriame žaidėjai arba komandos varžosi tarpusavyje kas eliminuos daugiau priešininkų, pažymint juos specialiais dažų kamuoliukais.',
        price: 0,
        date: new Date(2018, 9, 23, 20, 30, 0, 0),
        duration: '1,5 val',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SAULETEKIS,
        positionLongitude: 25.35,
        positionLatitude: 54.72,
        address: 'P.Žadeikos g. 2, LT-06318 Vilnius',
        contactDetails: {
            name: 'Vardenis Pavardenis',
            image: 'http://www.ve.lt/uploads/img/catalog/1/1633/644/zalgirio-treneris-sarunas-jasikevicius-jaunimas-nelabai-naudojosi-savo-sansais.jpg',
            phone: '+370 123 12345',
            email: 'vardenis.pavardenis@gmail.com',
        },
    }),
    new ActivityModel({
        name: 'Saulėtekio žirgynas',
        imageSrc: 'https://www.geradovana.lt/files/uploaded/programs/IMG_1741_20110921092136133.jpeg',
        type: ActivityType.HORSERIDING,
        description: 'Viename didžiausių žirgynų veisiama ir auginama 370 įvairių veislių veislinių žirgų.',
        price: 50,
        date: new Date(2018, 9, 23, 18, 30, 0, 0),
        duration: '1,5 val',
        gender: [Gender.MALE, Gender.FEMALE],
        place: Place.SAULETEKIS,
        positionLongitude: 25.338,
        positionLatitude: 54.73,
        address: 'P.Žadeikos g. 2, LT-06318 Vilnius',
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
    name: ActivityType.BASKETBALL,
    type: 'type',
    value: ActivityType.BASKETBALL,
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
}), new ActivityFilterModel({
    name: ActivityType.TENNIS,
    type: 'type',
    value: ActivityType.TENNIS,
    selected: false
}), new ActivityFilterModel({
    name: ActivityType.HORSERIDING,
    type: 'type',
    value: ActivityType.HORSERIDING,
    selected: false
}), new ActivityFilterModel({
    name: ActivityType.SQUASH,
    type: 'type',
    value: ActivityType.SQUASH,
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
}), new ActivityFilterModel({
    name: Place.VIRSULISKES,
    type: 'place',
    value: Place.VIRSULISKES,
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
