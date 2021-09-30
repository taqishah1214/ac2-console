import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { AccountsComponent } from './accounts/accounts.component';
import { Shell } from '@app/shell/shell.service';
const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/accounts', pathMatch: 'full' },
    {
      path: 'accounts',
      component: AccountsComponent,
      data: { title: extract('accounts') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountsRoutingModule {}
