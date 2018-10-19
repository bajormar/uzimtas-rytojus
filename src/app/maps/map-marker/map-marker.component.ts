import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ActivityModel} from '../../shared/activity/activity.model';

@Component({
    selector: 'ur-map-marker',
    templateUrl: './map-marker.component.html',
    styleUrls: ['./map-marker.component.scss']
})
export class MapMarkerComponent implements OnInit {

    @Input() public activity: ActivityModel;

    constructor(public elementRef: ElementRef) { }

    ngOnInit() {}

}
