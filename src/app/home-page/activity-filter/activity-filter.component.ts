import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../shared/activity/activity.service';
import {ActivityTypes} from '../../shared/activity/activity-types.enum';
import {ActivityFilterModel} from './activity-filter.model';

@Component({
    selector: 'ur-activity-filter',
    templateUrl: './activity-filter.component.html',
    styleUrls: ['./activity-filter.component.scss']
})
export class ActivityFilterComponent implements OnInit {
    filters = [new ActivityFilterModel({
        name: 'Futbolas',
        filterValue: ActivityTypes.FOOTBALL,
        selected: false
    }), new ActivityFilterModel({
        name: 'Tinklinis',
        filterValue: ActivityTypes.VOLLEYBALL,
        selected: false
    }), new ActivityFilterModel({
        name: 'Šokiai',
        filterValue: ActivityTypes.DANCES,
        selected: false
    })];

    constructor(private activityService: ActivityService) {
    }

    ngOnInit() {
    }

    filterActivities() {
        this.activityService.filterByTypes(this.filters.filter(f => f.selected).map(f => f.filterValue));
    }

}
