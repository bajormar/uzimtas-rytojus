import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'ur-activity-filter-v2',
    templateUrl: './activity-filter-v2.component.html',
    styleUrls: ['./activity-filter-v2.component.scss']
})
export class ActivityFilterV2Component implements OnInit {

    public submitted = false;

    public form = new FormGroup({
        activityField: new FormControl()
    });

    constructor(private router: Router) {}

    ngOnInit() {}

    public onSubmit() {
        this.submitted = true;
        this.router.navigateByUrl('/results');
    }

}
