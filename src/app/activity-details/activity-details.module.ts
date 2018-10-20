import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityDetailsComponent} from './activity-details.component';
import {MatCardModule, MatIconModule} from '@angular/material';
import {MapsModule} from '../maps/maps.module';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MapsModule,
        MatIconModule,
    ],
    declarations: [ActivityDetailsComponent]
})
export class ActivityDetailsModule {
}
