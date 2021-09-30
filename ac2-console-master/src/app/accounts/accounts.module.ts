import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { NewAccountComponent } from './accounts/new-account/new-account.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { SharedModule } from '@app/shared';
@NgModule({
  declarations: [AccountsComponent, NewAccountComponent, EditAccountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccountsRoutingModule,
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
  entryComponents: [NewAccountComponent, EditAccountComponent],
  exports: [BrowserAnimationsModule, MatFormFieldModule, AgGridModule],
  providers: [DatePipe]
})
export class AccountsModule {}
