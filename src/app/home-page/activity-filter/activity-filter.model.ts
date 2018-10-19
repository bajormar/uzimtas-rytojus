import {ActivityTypes} from '../../shared/activity/activity-types.enum';

export class ActivityFilterModel {
    name: string;
    filterValue: ActivityTypes;
    selected: boolean;

    constructor(data?: ActivityFilterModel) {
        Object.assign(this, data);
    }
}
