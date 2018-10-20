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
    filters = {
        type: [new ActivityFilterModel<ActivityTypes>({
            name: 'Futbolas',
            filterValue: ActivityTypes.FOOTBALL,
            selected: true
        }), new ActivityFilterModel<ActivityTypes>({
            name: 'Tinklinis',
            filterValue: ActivityTypes.VOLLEYBALL,
            selected: true
        }), new ActivityFilterModel<ActivityTypes>({
            name: 'Šokiai',
            filterValue: ActivityTypes.DANCES,
            selected: true
        }), new ActivityFilterModel<ActivityTypes>({
            name: 'Dažasvydis',
            filterValue: ActivityTypes.PAINT_BALL,
            selected: true
        }), new ActivityFilterModel<ActivityTypes>({
            name: 'Pabėgimo kambarys',
            filterValue: ActivityTypes.ESCAPE_ROOM,
            selected: true
        })
        ],
        place: [new ActivityFilterModel<string>({
            name: 'Antakalnis',
            filterValue: 'Antakalnis',
            selected: true
        }), new ActivityFilterModel<string>({
            name: 'Senamiestis',
            filterValue: 'Senamiestis',
            selected: true
        }), new ActivityFilterModel<string>({
            name: 'Sauletekis',
            filterValue: 'Sauletekis',
            selected: true
        })],
    };

    timeFrom = 0;
    timeTo = 1440;

    constructor(private activityService: ActivityService) {
    }

    ngOnInit() {
    }

    filterActivities() {
        const selectedTypes = this.filters.type.filter(f => f.selected);
        const selectedPlaces = this.filters.place.filter(f => f.selected);
        const types = (selectedTypes.length > 0 ? selectedTypes : this.filters.type).map(f => f.filterValue);
        const places = (selectedPlaces.length > 0 ? selectedPlaces : this.filters.place).map(f => f.filterValue);
        const timeFrom = this.timeFrom;
        const timeTo = this.timeTo;
        this.activityService.filter(types, places, timeFrom, timeTo);
    }

    formatTime(time: number) {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;
    }
}
