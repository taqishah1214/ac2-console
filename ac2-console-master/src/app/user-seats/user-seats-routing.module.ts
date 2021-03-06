import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/user-seats', pathMatch: 'full' }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserSeatsRoutingModule {}
