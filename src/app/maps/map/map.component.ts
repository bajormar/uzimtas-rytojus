import {Component, ElementRef, OnInit} from '@angular/core';

import mapboxgl from 'mapbox-gl';
import {ActivityService} from '../../shared/activity/activity.service';
import {MapService} from '../map.service';
import {ActivityModel} from '../../shared/activity/activity.model';
import {mapToken} from '../map-token';

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
                private mapService: MapService) {
    }

    ngOnInit() {
        mapboxgl.accessToken = mapToken;
        this.mapService.map = new mapboxgl.Map({
            container: 'map',
            center: [25.279652, 54.687157],
            zoom: 11,
            style: 'mapbox://styles/mapbox/streets-v9'
        });
        this.map = this.mapService.map;

        this.mapService.map.on('load', () => {
            this.initLayers();

            this.activityService.activitiesObservable.subscribe((activities) => {
                this.activities = activities;
                this.updateData(activities);
                this.centerActivities(activities);
                this.mapService.map.resize();
            });
        });
    }

    public initLayers() {
        const activityService = this.activityService;

        this.mapService.map.addSource('activities', this.mapService.getGeoActivityClusterSource([]));

        const map = this.mapService.map;

        map.addLayer(this.mapService.createActivityLayer());

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "activities",
            filter: ["has", "point_count"],
            layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12
            }
        });

        map.addLayer(this.mapService.getGeoActivityDisplayLayerSettings());

        map.on('mousedown', (function (e) {
            console.log(e);
        }));

        map.on('click', 'unclustered-point', (function (e) {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const activityId = e.features[0].properties.id;

            const activity = activityService.getActivity(activityId);

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`<b>${ activity.name }</b>`)
                .addTo(map);
        }).bind(this));

        map.on('click', 'clusters', function (e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
            var clusterId = features[0].properties.cluster_id;
            map.getSource('activities').getClusterExpansionZoom(clusterId, function (err, zoom) {
                if (err)
                    return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            });
        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });

    }

    private updateData(activities: ActivityModel[]) {
        const activitiesSource = this.mapService.map.getSource('activities');

        activitiesSource.setData(this.mapService.getActivityData(activities));
    }

    private centerActivities(activities: ActivityModel[]) {
        const bounds = new mapboxgl.LngLatBounds();

        activities.forEach((activity) => {
            bounds.extend([
                activity.positionLongitude,
                activity.positionLatitude,
            ]);
        });

        this.map.fitBounds(bounds, {
            padding: 100,
            maxZoom: 15
        });
    }
}
