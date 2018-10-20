import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityFilterComponent} from './activity-filter.component';
import {MatCheckboxModule, MatSliderModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        MatSliderModule,
    ],
    declarations: [ActivityFilterComponent],
    exports: [ActivityFilterComponent],
})
export class ActivityFilterModule {
}
