export class ActivityFilterModel<T> {
    name: string;
    filterValue: T;
    selected: boolean;

    constructor(data?: ActivityFilterModel<T>) {
        Object.assign(this, data);
    }
}
