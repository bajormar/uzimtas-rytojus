import { Component, OnInit } from '@angular/core';

import mapboxgl from 'mapbox-gl';

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

    constructor() {}

    ngOnInit() {
        mapboxgl.accessToken = mapboxAccessToken;
        this.map = new mapboxgl.Map({
            container: 'map',
            center: [ 25.279652, 54.687157 ],
            zoom: 10,
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
