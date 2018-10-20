import {ActivityTypes} from './activity-types.enum';

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

    positionLongitude: number; // Kaire desine
    positionLatitude: number; // Virsus apacia

    constructor(data?: ActivityModel) {
        Object.assign(this, data);
    }
}
