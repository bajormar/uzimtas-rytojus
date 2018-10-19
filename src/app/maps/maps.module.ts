import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';
import {RouterModule} from '@angular/router';
import { MapMarkerComponent } from './map-marker/map-marker.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        MapComponent,
        MapLayoutComponent,
        MapMarkerComponent
    ],
    exports: [
        MapComponent
    ]
})
export class MapsModule { }
