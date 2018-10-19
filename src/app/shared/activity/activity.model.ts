export class ActivityModel {
    name: string;
    description: string;
    price: number;
    duration: string;
    date: string;
    place: string;

    constructor(data?: ActivityModel) {
        Object.assign(this, data);
    }
}
