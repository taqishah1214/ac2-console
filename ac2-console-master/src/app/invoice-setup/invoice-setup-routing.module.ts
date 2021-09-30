import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { InvoiviceComponent } from './invoivice/invoivice.component';
import { Shell } from '@app/shell/shell.service';
const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/invoice-setup', pathMatch: 'full' },
    {
      path: 'invoice',
      component: InvoiviceComponent,
      data: { title: extract('invoice') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class invoiceSetupRoutingModule {}
