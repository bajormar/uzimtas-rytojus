import { Component, OnInit } from '@angular/core';

import mapboxgl from 'mapbox-gl';

@Component({
    selector: 'ur-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    public map;

    constructor() {}

    ngOnInit() {
        mapboxgl.accessToken = mapboxAccessToken;
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9'
        });
    }
}

const mapboxAccessToken = `pk.eyJ1IjoiZ2VkZWd1bnoiLCJhIjoiY2lpamFzdHhwMDB6cnUxa3BycnZ5ZjhqYiJ9.IwxZG1LAZ0V1uPuDk_f7hQ`;

class Activity {
    constructor(data?) {
        Object.assign(this, data);
    }
}
