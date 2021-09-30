import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

import { LoaderComponent } from './loader/loader.component';
import { TemplateRendererComponent } from './template-renderer/template-renderer.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from './pagination/pagination.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([]),
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    NgSelectModule
    // StoreModule.forRoot({ customerUnitWidget: CustomerUnitWidgetReducer })
  ],
  declarations: [
    LoaderComponent,
    TemplateRendererComponent,
    ConfirmationDialogComponent,
    PaginationComponent
  ],
  exports: [
    AgGridModule,
    LoaderComponent,
    TemplateRendererComponent,
    PaginationComponent
  ],
  entryComponents: [TemplateRendererComponent, ConfirmationDialogComponent]
})
export class SharedModule {}
