import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';

import mapboxgl from 'mapbox-gl';
import {ActivityService} from '../../shared/activity/activity.service';
import {MapMarkerComponent} from '../map-marker/map-marker.component';
import {MapService} from '../map.service';

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

    constructor(private elRef: ElementRef,
                private activityService: ActivityService,
                private mapService: MapService) {}

    ngOnInit() {
        mapboxgl.accessToken = mapboxAccessToken;
        this.mapService.map = new mapboxgl.Map({
            container: 'map',
            center: [ 25.279652, 54.687157 ],
            zoom: 10,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        this.mapService.map.on('mousedown', function (e) {
            console.log(e);
                // e.point is the x, y coordinates of the mousemove event relative
                // to the top-left corner of the map
                // JSON.stringify(e.point) + '<br />' +
                // e.lngLat is the longitude, latitude geographical position of the event
                // JSON.stringify(e.lngLat);
        });

        this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = activities;
        });
    }
}

const mapboxAccessToken = `pk.eyJ1IjoiZ2VkZWd1bnoiLCJhIjoiY2lpamFzdHhwMDB6cnUxa3BycnZ5ZjhqYiJ9.IwxZG1LAZ0V1uPuDk_f7hQ`;
