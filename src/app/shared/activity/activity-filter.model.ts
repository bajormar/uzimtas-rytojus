let counter = 0;

export class ActivityFilterModel {
    id: number;
    name: string;
    type: string;
    value: any;
    selected: boolean;

    constructor(data?: {
        name: string;
        type: string;
        value: any;
        selected: boolean;
    }) {
        Object.assign(this, data);
        this.id = counter++;
    }
}
