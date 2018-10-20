import {Component, OnInit} from '@angular/core';
import {ActivityModel} from '../shared/activity/activity.model';
import {ActivityService} from '../shared/activity/activity.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'ur-activity-details',
    templateUrl: './activity-details.component.html',
    styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

    activity: ActivityModel;

    constructor(private activityService: ActivityService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.activity  = this.activityService.getActivity(Number(params.get('id')));
        });
    }

}
