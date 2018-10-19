import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityItemComponent } from './activity-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActivityItemComponent],
  exports: [ActivityItemComponent]
})
export class ActivityItemModule { }
