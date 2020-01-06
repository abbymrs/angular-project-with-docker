import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { StateService } from 'src/app/shared/service/state.service';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.scss']
})
export class ViewLogComponent implements OnInit, AfterViewInit {

  inputControls = [];
  batchLog = <any>{};

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private state: StateService,
    private utilService: UtilService,
  ) { }

  ngOnInit() {
    this.state.editingItem$.subscribe((data: any) => {
      this.batchLog = data;
      this.inputControls = [
        { type: 'text', model: data.tenantName, className: 'tenant-name', controlName: 'tenantName', placeholder: 'Tenant Name', isDisabled: true },
        { type: 'text', model: data.executionTime, className: 'execution-time', controlName: 'executionTime', placeholder: 'Execution Time', isDisabled: true },
        { type: 'text', model: data.durationTime, className: 'duration-time', controlName: 'durationTime', placeholder: 'Duration Time', isDisabled: true },
        { type: 'text', model: data.executionStatus, className: 'execution-status', controlName: 'executionStatus', placeholder: 'Execution Status', isDisabled: true },
        { type: 'text', model: data.failureTimes, className: 'failure-times', controlName: 'failureTimes', placeholder: 'Failure Times', isDisabled: true }
      ];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.utilService.handleFormItemStatus(this.batchLog);
    }, 0);
  }
}
