import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityDetailsComponent} from './activity-details.component';
import {MatCardModule} from '@angular/material';
import {MapsModule} from '../maps/maps.module';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MapsModule,
    ],
    declarations: [ActivityDetailsComponent]
})
export class ActivityDetailsModule {
}
