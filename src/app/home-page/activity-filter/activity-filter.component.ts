import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../shared/activity/activity.service';
import {ActivityTypes} from '../../shared/activity/activity-types.enum';
import {ActivityFilterModel} from '../../shared/activity/activity-filter.model';

@Component({
    selector: 'ur-activity-filter',
    templateUrl: './activity-filter.component.html',
    styleUrls: ['./activity-filter.component.scss']
})
export class ActivityFilterComponent implements OnInit {
    filters: ActivityFilterModel[] = [];

    typeFilters = this.filters.filter(f => f.type === 'type');
    placeFilters = this.filters.filter(f => f.type === 'place');

    timeFrom = 0;
    timeTo = 1440;

    constructor(private activityService: ActivityService) {}

    ngOnInit() {
        this.activityService.filtersObservable.subscribe(filters => {
            this.filters = filters;
        });
    }

    updateFilter(filter: ActivityFilterModel) {
        this.activityService.updateFilter(filter.id, filter.selected);
    }

    formatTime(time: number) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;
    }
}
