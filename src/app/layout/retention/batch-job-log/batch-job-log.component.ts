import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, ConfirmationService } from 'primeng/api';

import { StateService } from 'src/app/shared/service/state.service';
import { PAGESIZE } from 'src/app/shared/config';
import { RetentionService } from '../retention.service';
import { UtilService } from 'src/app/shared/service/util.service';
import { ViewLogComponent } from '../components/view-log/view-log.component';

@Component({
  selector: 'app-batch-job-log',
  templateUrl: './batch-job-log.component.html',
  styleUrls: ['./batch-job-log.component.scss'],
  providers: [
    ConfirmationService,
    DialogService
  ]
})
export class BatchJobLogComponent implements OnInit {
  searchInputControls = [
    { type: 'text', className: 'search batch-job-log-search', controlName: 'batchJobLog', placeholder: 'Please input your keyword...' }
  ];
  cols = [
    { field: "id", header: "ID" },
    { field: "tenantName", header: "Tenant Name" },
    { field: "executionTime", header: "Execution Time" },
    { field: "durationTime", header: "Duration Time(Minutes)" },
    { field: "executionStatus", header: "Execution Status" },
    { field: "failureTimes", header: "Failure Times" }
  ];
  batchJobLogList = [];
  selectedLog = <any>{};
  totalNumber = 1;
  pageSize = PAGESIZE;
  current_page = 1;
  isViewing = false;
  isShowRejectLabel = false;
  dialogTitle: string;
  searchedTag: string;
  acceptLabel = 'Yes';

  constructor(
    private route: ActivatedRoute,
    private state: StateService,
    private retentionService: RetentionService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.state.resetTitle(d.title);
    })
    this.getLogs();
  }

  getLogs() {
    this.retentionService.getLogList()
      .subscribe(res => {
        if (res.code === 0) {
          this.batchJobLogList = res.batchJobLogList.map((item, idx) => {
            item.id = idx + 1;
            return item;
          });
          this.totalNumber = res.totalNumber;
        }
      });
  }

  searchLog(data) {
    console.log(data);
  }
  paginate(current_page) {
    this.current_page = current_page.page + 1;
  }

  viewLog() {
    this.dialogTitle = 'View Batch Job Log';
    this.isViewing = true;
    const isSelected = this.utilService.isSelectedItem(this.selectedLog);

    if (isSelected) {
      this.state.updateEditItem(this.selectedLog);
      this.isShowRejectLabel = true;
      const ref = this.dialogService.open(ViewLogComponent, {
        header: 'View Batch Job Log',
        width: '400px'
      });
      ref.onClose.subscribe((data: any) => {
        this.isViewing = false;
      });
    } else {
      this.isShowRejectLabel = false;
      this.acceptLabel = 'OK';
      this.confirmationService.confirm({
        message: 'Please select a log that you want to view~',
        accept: () => {
          this.isViewing = false;
        },
        reject: () => {
          this.isViewing = false;
        }
      });
    }
  }
}
