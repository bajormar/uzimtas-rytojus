import {ActivityType} from './activity-type.enum';
import {Gender} from './gender.enum';
import {Place} from './place.enum';

let uniqueId = 1;

export class ActivityModel {
    id: number;
    name: string;
    type: ActivityType;
    imageSrc: string;
    description: string;
    price: number;
    duration: string;
    gender: Gender[];
    date: Date;
    place: string;
    address: string;

    contactDetails: {
        name: string;
        image: string;
        phone: string;
        email: string;
    };

    positionLongitude: number; // Kaire desine
    positionLatitude: number; // Virsus apacia

    constructor(data?: {
        name: string;
        type: ActivityType;
        imageSrc: string;
        description: string;
        price: number;
        duration: string;
        date: Date;
        place: Place;
        positionLongitude: number;
        positionLatitude: number;
        gender: Gender[];
        address: string;

        contactDetails: {
            name: string;
            image: string;
            phone: string;
            email: string;
        }
    }) {
        Object.assign(this, data);
        this.id = uniqueId++;
    }
}
