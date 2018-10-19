import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityModule} from './activity/activity.module';

@NgModule({
    imports: [
        CommonModule,
        ActivityModule
    ],
    declarations: []
})
export class SharedModule {
}
