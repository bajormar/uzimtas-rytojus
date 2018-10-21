import {Component, Input, OnInit} from '@angular/core';
import {mapToken} from '../map-token';
import mapboxgl from 'mapbox-gl';
import {MapService} from '../map.service';
import {ActivityModel} from '../../shared/activity/activity.model';
import {ActivityItemComponent} from '../../results-page/activity-list/activity-item/activity-item.component';
import {ActivityService} from '../../shared/activity/activity.service';
import {UserService} from '../../shared/user/user.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'ur-map-static',
    templateUrl: './map-static.component.html',
    styleUrls: ['./map-static.component.scss']
})
export class MapStaticComponent implements OnInit {

    @Input() activities: ActivityModel[] = [];

    private userProfile;

    constructor(private mapService: MapService,
                private matDialog: MatDialog,
                private activityService: ActivityService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userService.userObservable.subscribe((up) => this.userProfile = up);

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


            map.on('click', 'unclustered-point', (function (e) {
                const activityId = e.features[0].properties.id;


                const activity = this.activityService.getActivity(activityId);
                const dialogRef = this.matDialog.open(ActivityItemComponent);
                (dialogRef.componentInstance as ActivityItemComponent).activity = activity;
                (dialogRef.componentInstance as ActivityItemComponent).user = this.userProfile;
            }).bind(this));

        });


    }

}
