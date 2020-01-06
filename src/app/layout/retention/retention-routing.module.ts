import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetentionComponent } from './retention.component';
import { TagManagementComponent } from './tag-management/tag-management.component';
import { BatchJobLogComponent } from './batch-job-log/batch-job-log.component';
import { BatchJobComponent } from './batch-job/batch-job.component';

const routes: Routes = [
  {
    path: '',
    component: RetentionComponent,
    children: [
      {
        path: 'tag-management',
        component: TagManagementComponent,
        data: {
          title: 'Tag Management'
        }
      },
      {
        path: 'batch-job',
        component: BatchJobComponent,
        data: {
          title: 'Batch Job'
        }
      },
      {
        path: 'batch-job-log',
        component: BatchJobLogComponent,
        data: {
          title: 'Batch Job Log'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetentionRoutingModule { }
