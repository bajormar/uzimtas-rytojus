import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {HomePageModule} from './home-page/home-page.module';
import {MapsModule} from './maps/maps.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        HomePageModule,
        MapsModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
