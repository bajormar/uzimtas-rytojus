import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ActivityFilterV2Component} from './activity-filer/activity-filter-v2.component';
import {RecommendedActivitiesComponent} from './recommended-activities/recommended-activities.component';
import {MapsModule} from '../../maps/maps.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MapsModule,
    ],
    declarations: [
        ActivityFilterV2Component,
        RecommendedActivitiesComponent
    ],
    exports: [
        ActivityFilterV2Component,
        RecommendedActivitiesComponent
    ]
})
export class ActivityModule { }
