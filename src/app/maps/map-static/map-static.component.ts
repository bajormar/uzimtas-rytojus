import {Component, Input, OnInit} from '@angular/core';
import {mapToken} from '../map-token';
import mapboxgl from 'mapbox-gl';
import {MapService} from '../map.service';
import {ActivityModel} from '../../shared/activity/activity.model';

@Component({
    selector: 'ur-map-static',
    templateUrl: './map-static.component.html',
    styleUrls: ['./map-static.component.scss']
})
export class MapStaticComponent implements OnInit {

    @Input() activities: ActivityModel[] = [];

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
            container: 'static-map',
            center: [25.279652, 54.687157],
            scrollZoom: false,
            boxZoom: true,
            zoom: 11,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl({
            // Hide rotation control.
            zoomIn: true,
            zoomOut: false,
            showCompass: false
        }));

        map.on('load', () => {
            map.addSource('activities', this.mapService.getGeoActivitySource(this.activities));

            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'activities',
                paint: {
                    'circle-color': '#312442',
                    'circle-radius': 10,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#312442'
                }
            });

            const bounds = new mapboxgl.LngLatBounds();

            this.activities.forEach((activity) => {
                bounds.extend([
                    activity.positionLongitude,
                    activity.positionLatitude,
                ]);
            });

            map.fitBounds(bounds, { padding: 100 });
        });


    }

}
