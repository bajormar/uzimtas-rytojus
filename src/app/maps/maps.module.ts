import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map/map.component';
import {MapLayoutComponent} from './map-layout/map-layout.component';
import {RouterModule} from '@angular/router';
import {MapMarkerComponent} from './map-marker/map-marker.component';
import {MapStaticComponent} from './map-static/map-static.component';
import {MatDialogModule} from '@angular/material';
import {ActivityItemComponent} from '../results-page/activity-list/activity-item/activity-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
    ],
    declarations: [
        MapComponent,
        MapLayoutComponent,
        MapMarkerComponent,
        MapStaticComponent
    ],
    exports: [
        MapComponent,
        MapStaticComponent,
    ],
    entryComponents: [
        ActivityItemComponent
    ]
})
export class MapsModule { }
