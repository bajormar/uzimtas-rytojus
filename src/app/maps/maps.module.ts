import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapLayoutComponent } from './map-layout/map-layout.component';
import {RouterModule} from '@angular/router';
import { MapMarkerComponent } from './map-marker/map-marker.component';
import { MapStaticComponent } from './map-static/map-static.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        MapComponent,
        MapLayoutComponent,
        MapMarkerComponent,
        MapStaticComponent,
    ],
    exports: [
        MapComponent,
        MapStaticComponent,
    ]
})
export class MapsModule { }
