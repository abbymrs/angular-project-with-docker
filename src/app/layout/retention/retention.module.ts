import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RetentionRoutingModule } from "./retention-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { RetentionComponent } from "./retention.component";
import { BatchJobComponent } from "./batch-job/batch-job.component";
import { BatchJobLogComponent } from "./batch-job-log/batch-job-log.component";
import { TagManagementComponent } from "./tag-management/tag-management.component";
import { AddTagComponent } from "./components/add-tag/add-tag.component";
import { EditTagComponent } from "./components/edit-tag/edit-tag.component";
import { EditBatchJobComponent } from "./components/edit-batch-job/edit-batch-job.component";
import { ViewLogComponent } from "./components/view-log/view-log.component";
import { AddBatchJobComponent } from "./components/add-batch-job/add-batch-job.component";

@NgModule({
  declarations: [
    RetentionComponent,
    BatchJobComponent,
    BatchJobLogComponent,
    TagManagementComponent,
    AddTagComponent,
    EditTagComponent,
    EditBatchJobComponent,
    ViewLogComponent,
    AddBatchJobComponent
  ],
  imports: [CommonModule, SharedModule, RetentionRoutingModule],
  entryComponents: [
    AddTagComponent,
    EditTagComponent,
    EditBatchJobComponent,
    ViewLogComponent,
    AddBatchJobComponent
  ]
})
export class RetentionModule {}
