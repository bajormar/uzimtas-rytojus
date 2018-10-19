import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityListComponent} from './activity-list.component';
import {ActivityItemModule} from './activity-item/activity-item.module';

@NgModule({
    imports: [
        CommonModule,
        ActivityItemModule
    ],
    declarations: [ActivityListComponent],
    exports: [ActivityListComponent]
})
export class ActivityListModule {
}
