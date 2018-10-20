import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../shared/activity/activity.service';

@Component({
    selector: 'ur-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    constructor(private activityService: ActivityService) { }

    ngOnInit() {
        this.activityService.clearFilters();
    }
}
