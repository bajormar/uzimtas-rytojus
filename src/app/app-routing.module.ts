import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {MapLayoutComponent} from './maps/map-layout/map-layout.component';
import {MapComponent} from './maps/map/map.component';
import {ActivityDetailsComponent} from './activity-details/activity-details.component';

const routes: Routes = [
    {
        path: '',
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
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
