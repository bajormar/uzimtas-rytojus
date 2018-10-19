import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';

import mapboxgl from 'mapbox-gl';
import {ActivityService} from '../../shared/activity/activity.service';
import {MapMarkerComponent} from '../map-marker/map-marker.component';

@Component({
    selector: 'ur-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    host: {
        class: 'w-100 h-100'
    }
})
export class MapComponent implements OnInit {

    public map;

    public activities = [];

    // Mapbox Markers list.
    private mpMarkers = [];

    constructor(private elRef: ElementRef,
                private activityService: ActivityService) {}

    ngOnInit() {
        mapboxgl.accessToken = mapboxAccessToken;
        this.map = new mapboxgl.Map({
            container: 'map',
            center: [ 25.279652, 54.687157 ],
            zoom: 10,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = activities;
            this.updateMarkers();
        });

        this.updateMarkers();
    }

    @ViewChildren(MapMarkerComponent) public set markers(marker: QueryList<MapMarkerComponent>) {
        this.mpMarkers.forEach(mpMarker => {
            mpMarker.remove();
        });

        this.mpMarkers = [];
        marker.toArray().forEach((markerComponent) => {
            console.dir(markerComponent.elementRef.nativeElement);
            const activity = markerComponent.activity;
            const mpMarker = new mapboxgl.Marker(markerComponent.elementRef.nativeElement.children[0])
                .setLngLat([activity.positionLongitude, activity.positionLatitude])
                .addTo(this.map);

            this.mpMarkers.push(mpMarker);
        });
    }

    private updateMarkers() {}
}

const mapboxAccessToken = `pk.eyJ1IjoiZ2VkZWd1bnoiLCJhIjoiY2lpamFzdHhwMDB6cnUxa3BycnZ5ZjhqYiJ9.IwxZG1LAZ0V1uPuDk_f7hQ`;
