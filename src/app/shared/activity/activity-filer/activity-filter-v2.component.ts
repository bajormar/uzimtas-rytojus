import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ActivityService} from '../activity.service';
import {ActivityFilterModel} from '../activity-filter.model';

@Component({
    selector: 'ur-activity-filter-v2',
    templateUrl: './activity-filter-v2.component.html',
    styleUrls: ['./activity-filter-v2.component.scss']
})
export class ActivityFilterV2Component implements OnInit {

    public submitted = false;

    public form = new FormGroup({
        types: new FormControl([]),
        places: new FormControl([]),
        times: new FormControl([]),
        genders: new FormControl([])
    });

    typeFilters: ActivityFilterModel[] = [];
    placeFilters: ActivityFilterModel[] = [];
    timeFilters: ActivityFilterModel[] = [];
    genderFilters: ActivityFilterModel[] = [];

    constructor(private router: Router, private activityService: ActivityService) {
    }

    ngOnInit() {
        this.activityService.filtersObservable.subscribe(filters => {
            this.typeFilters = filters.filter(f => f.type === 'type');
            this.placeFilters = filters.filter(f => f.type === 'place');
            this.timeFilters = filters.filter(f => f.type === 'time');
            this.genderFilters = filters.filter(f => f.type === 'gender');

            this.form.get('types').setValue(this.typeFilters.filter(f => f.selected).map(f => f.id));
            this.form.get('places').setValue(this.placeFilters.filter(f => f.selected).map(f => f.id));
            this.form.get('times').setValue(this.timeFilters.filter(f => f.selected).map(f => f.id));
            this.form.get('genders').setValue(this.genderFilters.filter(f => f.selected).map(f => f.id));
        });
    }

    public onSubmit() {
        this.submitted = true;
        this.activityService.clearFilters();

        const activeFiltersIds = [
            ...this.form.get('types').value,
            ...this.form.get('places').value,
            ...this.form.get('times').value,
            ...this.form.get('genders').value
        ];

        activeFiltersIds.forEach(filterId => {
            this.activityService.updateFilter(filterId, true);
        });

        this.activityService.filterActivities();
        this.router.navigateByUrl('/results');
    }

}
