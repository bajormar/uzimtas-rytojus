import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityItemComponent} from './activity-item.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {TruncateModule} from '@yellowspot/ng-truncate';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        TruncateModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [ActivityItemComponent],
    exports: [ActivityItemComponent]
})
export class ActivityItemModule {
}
