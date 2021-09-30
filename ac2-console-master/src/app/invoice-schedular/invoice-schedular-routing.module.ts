import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/invoice-schedular', pathMatch: 'full' },
    {
      path: 'invoice-list',
      component: InvoiceListComponent,
      data: { title: extract('invoice-list') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class invoiceSchedularRoutingModule {}
