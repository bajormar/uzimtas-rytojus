import {ActivityTypes} from './activity-types.enum';

let uniqueId = 1;

export class ActivityModel {
    id: number;
    name: string;
    type: ActivityTypes;
    imageSrc: string;
    description: string;
    price: number;
    duration: string;
    date: Date;
    place: string;

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
        type: ActivityTypes;
        imageSrc: string;
        description: string;
        price: number;
        duration: string;
        date: Date;
        place: string;
        positionLongitude: number;
        positionLatitude: number;

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
