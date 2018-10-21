import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityListComponent} from './activity-list.component';
import {ActivityItemModule} from './activity-item/activity-item.module';
import {MatCardModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ActivityItemModule,
        MatCardModule,
    ],
    declarations: [ActivityListComponent],
    exports: [ActivityListComponent]
})
export class ActivityListModule {
}
