import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityFilterComponent} from './activity-filter.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ActivityFilterComponent],
    exports: [ActivityFilterComponent],
})
export class ActivityFilterModule {
}
