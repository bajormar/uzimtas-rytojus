import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActivityListComponent],
  exports: [ActivityListComponent]
})
export class ActivityListModule { }
