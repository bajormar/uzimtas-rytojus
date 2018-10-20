import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './results-page/home-page.component';
import {MapLayoutComponent} from './maps/map-layout/map-layout.component';
import {MapComponent} from './maps/map/map.component';
import {ActivityDetailsComponent} from './activity-details/activity-details.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'results',
                component: HomePageComponent
            },
            {
                path: 'details/:id',
                component: ActivityDetailsComponent
            },
            {
                path: 'map',
                component: MapLayoutComponent,
                children: [
                    {
                        path: '',
                        component: MapComponent,
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
