import {Component, ElementRef, OnInit} from '@angular/core';

import mapboxgl from 'mapbox-gl';
import {ActivityService} from '../../shared/activity/activity.service';
import {MapService} from '../map.service';
import {ActivityModel} from '../../shared/activity/activity.model';

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
        mapboxgl.accessToken = mapboxAccessToken;
        this.mapService.map = new mapboxgl.Map({
            container: 'map',
            center: [25.279652, 54.687157],
            zoom: 11,
            style: 'mapbox://styles/mapbox/streets-v9'
        });

        // this.mapService.map.on('mousedown', function (e) {
        //     console.log(e);
        // });

        this.mapService.map.on('load', () => (() => this.test()).bind(this));

        this.activityService.activitiesObservable.subscribe((activities) => {
            this.activities = activities;
        });
    }

    public test() {
        const activityService = this.activityService;

        this.mapService.map.addSource('activities', {
            type: 'geojson',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)

            data: {
                type: 'FeatureCollection',
                features: this.activities.map((activity: ActivityModel) => {
                    return {
                        type: 'Feature',
                        properties: {
                            id: activity.id
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [
                                activity.positionLongitude,
                                activity.positionLatitude
                            ]
                        }
                    };
                })
            }
        });

        const map = this.mapService.map;

        map.addLayer({
            id: "clusters",
            type: "circle",
            source: "activities",
            filter: ["has", "point_count"],
            paint: {
                // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                "circle-color": [
                    "step",
                    ["get", "point_count"],
                    "#51bbd6",
                    3,
                    "#f1f075",
                    4,
                    "#f28cb1"
                ],
                "circle-radius": [
                    "step",
                    ["get", "point_count"],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        });

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

        map.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "activities",
            filter: ["!", ["has", "point_count"]],
            paint: {
                "circle-color": "#11b4da",
                "circle-radius": 10,
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff"
            }
        });

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
                .setHTML(activity.description)
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
}

const mapboxAccessToken = `pk.eyJ1IjoiZ2VkZWd1bnoiLCJhIjoiY2lpamFzdHhwMDB6cnUxa3BycnZ5ZjhqYiJ9.IwxZG1LAZ0V1uPuDk_f7hQ`;
