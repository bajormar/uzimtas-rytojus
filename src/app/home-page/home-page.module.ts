import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page.component';
import {MatCardModule, MatToolbarModule} from '@angular/material';
import {ActivityFilterModule} from './activity-filter/activity-filter.module';
import {ActivityListModule} from './activity-list/activity-list.module';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        ActivityFilterModule,
        ActivityListModule,
    ],
    declarations: [HomePageComponent]
})
export class HomePageModule {
}
