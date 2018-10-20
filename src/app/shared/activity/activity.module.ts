import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ActivityFilterV2Component} from './activity-filer/activity-filter-v2.component';

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
    ],
    declarations: [
        ActivityFilterV2Component
    ],
    exports: [
        ActivityFilterV2Component
    ]
})
export class ActivityModule { }
