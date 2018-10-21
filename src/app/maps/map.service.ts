import {Injectable} from '@angular/core';
import {ActivityModel} from '../shared/activity/activity.model';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    public map;

    constructor() {
    }

    public getGeoActivityDisplayLayerSettings() {
        return {
            id: 'unclustered-point',
            type: 'circle',
            source: 'activities',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#312442',
                'circle-radius': 10,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        };
    }

    public getGeoActivitySource(activities: ActivityModel[]) {
        return {
            type: 'geojson',
            data: this.getActivityData(activities)
        };
    }

    public getGeoActivityClusterSource(activities: ActivityModel[]) {
        return {
            type: 'geojson',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
            data: this.getActivityData(activities)
        };
    }

    public getActivityData(activities: ActivityModel[]) {
        return {
            type: 'FeatureCollection',
            features: activities.map((activity: ActivityModel) => {
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
        };
    }

    public createActivityLayer() {
        return {
            id: 'clusters',
            type: 'circle',
            source: 'activities',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#d6cf31',
                    4,
                    '#f1782f',
                    6,
                    '#f22f14'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        };
    }
}
