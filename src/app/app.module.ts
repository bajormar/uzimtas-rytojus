import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {HomePageModule} from './home-page/home-page.module';
import {MapsModule} from './maps/maps.module';
import {SharedModule} from './shared/shared.module';
import {ActivityDetailsModule} from './activity-details/activity-details.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        HomePageModule,
        MapsModule,
        SharedModule,
        ActivityDetailsModule,
        MatToolbarModule,
        RouterModule,
        MatButtonModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
