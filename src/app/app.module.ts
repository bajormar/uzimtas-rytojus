import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {HomePageModule} from './home-page/home-page.module';
import {MapsModule} from './maps/maps.module';
import {SharedModule} from './shared/shared.module';
import {ActivityDetailsModule} from './activity-details/activity-details.module';
import {RouterModule} from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        HomePageModule,
        MapsModule,
        SharedModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        ActivityDetailsModule,
        MatToolbarModule,
        RouterModule,

        ReactiveFormsModule,
    ],
    declarations: [
        AppComponent,
        LandingPageComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
