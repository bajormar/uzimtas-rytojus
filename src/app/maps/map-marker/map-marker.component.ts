import {AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivityModel} from '../../shared/activity/activity.model';
import mapboxgl from 'mapbox-gl';
import {MapService} from '../map.service';

@Component({
    selector: 'ur-map-marker',
    templateUrl: './map-marker.component.html',
    styleUrls: ['./map-marker.component.scss']
})
export class MapMarkerComponent implements OnInit, AfterContentInit, OnDestroy {

    @Input() public activity: ActivityModel;

    @ViewChild('marker', { read: ElementRef }) markerElementRef: ElementRef;

    public marker;

    constructor(private mapService: MapService) { }

    public ngOnInit() {}

    public ngAfterContentInit(): void {
        this.marker = new mapboxgl.Marker(this.markerElement)
            .setLngLat([this.activity.positionLongitude, this.activity.positionLatitude])
            // .addTo(this.mapService.map);
    }

    ngOnDestroy(): void {
        this.marker.remove();
    }

    private get markerElement(): any {
        return this.markerElementRef.nativeElement;
    }
}
