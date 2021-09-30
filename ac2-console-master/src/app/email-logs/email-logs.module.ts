import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailLogsComponent } from './email-logs/email-logs.component';
import { EmailLogsRoutingModule } from './email-logs-routing.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [EmailLogsComponent],
  imports: [
    CommonModule,
    EmailLogsRoutingModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgSelectModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    HighchartsChartModule,
    SharedModule
  ]
})
export class EmailLogsModule {}
