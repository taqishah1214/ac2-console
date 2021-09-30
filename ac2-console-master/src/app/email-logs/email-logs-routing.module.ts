import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { EmailLogsComponent } from './email-logs/email-logs.component';
import { Shell } from '@app/shell/shell.service';
const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/email-logs', pathMatch: 'full' },
    {
      path: 'email-logs',
      component: EmailLogsComponent,
      data: { title: extract('email-logs') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmailLogsRoutingModule {}
