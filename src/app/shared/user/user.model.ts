let uniqueId = 1;

export class UserModel {
    id: number;
    name: string;
    starredActivities: number[];

    constructor(data?: {
        name: string;
        starredActivities: number[];
    }) {
        Object.assign(this, data);
        this.id = uniqueId++;
    }
}
