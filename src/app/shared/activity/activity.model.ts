import {ActivityTypes} from './activity-types.enum';

export class ActivityModel {
    name: string;
    type: ActivityTypes;
    description: string;
    price: number;
    duration: string;
    date: string;
    place: string;

    positionLongitude: number; // Kaire desine
    positionLatitude: number; // Virsus apacia

    constructor(data?: ActivityModel) {
        Object.assign(this, data);
    }
}
