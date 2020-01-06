import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tenant',
        data: { title: 'Tenant Management' },
        loadChildren: () =>
          import('./tenant/tenant.module').then(mod => mod.TenantModule)
      },
      {
        path: 'user',
        data: { title: 'User Management' },
        loadChildren: () =>
          import('./user/user.module').then(mod => mod.UserModule)
      },
      {
        path: 'retention',
        loadChildren: () =>
          import('./retention/retention.module').then(mod => mod.RetentionModule)
      },
      {
        path: 'multimedia',
        loadChildren: () =>
          import('./multimedia/multimedia.module').then(mod => mod.MultimediaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
