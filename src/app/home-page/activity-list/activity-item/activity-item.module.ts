import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityItemComponent} from './activity-item.component';
import {MatCardModule} from '@angular/material';
import {TruncateModule} from '@yellowspot/ng-truncate';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        TruncateModule,
    ],
    declarations: [ActivityItemComponent],
    exports: [ActivityItemComponent]
})
export class ActivityItemModule {
}
