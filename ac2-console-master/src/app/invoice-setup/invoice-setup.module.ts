import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InvoiviceComponent } from './invoivice/invoivice.component';
import { invoiceSetupRoutingModule } from './invoice-setup-routing.module';
import { NewInvoiviceComponent } from './invoivice/new-invoivice/new-invoivice.component';
import { EditInvoiviceComponent } from './invoivice/edit-invoivice/edit-invoivice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatDialogModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    InvoiviceComponent,
    NewInvoiviceComponent,
    EditInvoiviceComponent
  ],
  imports: [
    CommonModule,
    invoiceSetupRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    AgGridModule.withComponents([]),
    BrowserModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [BrowserAnimationsModule, MatFormFieldModule, AgGridModule],
  providers: [DatePipe],
  entryComponents: [NewInvoiviceComponent, EditInvoiviceComponent]
})
export class InvoiceSetupModule {}
