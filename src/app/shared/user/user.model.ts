let uniqueId = 1;

export class UserModel {
    id: number;
    name: string;
    starredActivities: number[];
    positionLatitude: number;
    positionLongtitude: number;

    constructor(data?: {
        name: string;
        starredActivities: number[];
    }) {
        Object.assign(this, data);
        this.id = uniqueId++;
        this.positionLatitude = 0;
        this.positionLongtitude = 0;
    }
}
