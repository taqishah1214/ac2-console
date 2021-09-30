import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { invoiceSchedularRoutingModule } from './invoice-schedular-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { EditInvoicePaymentComponent } from './invoice-list/edit-invoice-payment/edit-invoice-payment.component';
import { ConfirmationDialogService } from '@app/shared/confirmation-dialog/confirmation-dialog.service';
import { SharedModule } from '@app/shared';
@NgModule({
  declarations: [InvoiceListComponent, EditInvoicePaymentComponent],
  imports: [
    CommonModule,
    invoiceSchedularRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    SharedModule,
    AgGridModule.withComponents([]),
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [BrowserAnimationsModule, MatFormFieldModule, AgGridModule],
  providers: [DatePipe, ConfirmationDialogService],
  entryComponents: [EditInvoicePaymentComponent]
})
export class InvoiceSchedularModule {}
