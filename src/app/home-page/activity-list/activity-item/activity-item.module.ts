import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityItemComponent} from './activity-item.component';
import {MatCardModule} from '@angular/material';
import {TruncateModule} from '@yellowspot/ng-truncate';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        TruncateModule,
        RouterModule,
    ],
    declarations: [ActivityItemComponent],
    exports: [ActivityItemComponent]
})
export class ActivityItemModule {
}
