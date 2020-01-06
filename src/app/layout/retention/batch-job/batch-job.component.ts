import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BatchJobService } from "./batch-job.service";
import { RetentionService } from "../retention.service";
import { StateService } from "src/app/shared/service/state.service";
import { ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/api";
import { EditBatchJobComponent } from "../components/edit-batch-job/edit-batch-job.component";
import { AddBatchJobComponent } from "../components/add-batch-job/add-batch-job.component";

@Component({
  selector: "app-batch-job",
  templateUrl: "./batch-job.component.html",
  styleUrls: ["./batch-job.component.scss"],
  providers: [ConfirmationService, DialogService]
})
export class BatchJobComponent implements OnInit {
  searchInputControls = [
    {
      type: "text",
      className: "",
      controlName: "tenant_name",
      placeholder: "Tenant Name"
    },
    {
      type: "select",
      className: "",
      controlName: "status",
      labelName: "Status",
      optionsData: [
        { id: 0, value: "Inactive" },
        { id: 1, value: "Active" }
      ]
    }
  ];
  batchJobList: any[];
  checked: boolean = true;
  selectedRows: any = "";
  cols: any[] = [
    { field: "id", header: "No." },
    { field: "tenantName", header: "Tenant Name" },
    { field: "tenantType", header: "Tenant Type" },
    { field: "scheduledTimes", header: "Schelduled Time" },
    { field: "status", header: "Status" }
  ];

  minDate = new Date();
  constructor(
    private batchJobService: BatchJobService,
    private confirmService: ConfirmationService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private state: StateService,
    private retentionService: RetentionService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.state.resetTitle(d.title);
    });
    this.getBatchJobList();
  }

  getBatchJobList() {
    this.batchJobService.getBatchJobList().subscribe(res => {
      if (res.code === 0) {
        this.batchJobList = res.batchJobList;
      }
    });
  }

  onRowSelect(data) {
    this.selectedRows = data.data;
  }

  onRowUnselect() {
    this.selectedRows = "";
  }

  handleEdit(target) {
    target.parentElement.classList.add("active-btn");
    if (!this.selectedRows) {
      this.confirmService.confirm({
        message: "Please select a data",
        header: "Confirmation",
        rejectVisible: false,
        accept: () => {
          target.parentElement.classList.remove("active-btn");
        },
        reject: () => {
          target.parentElement.classList.remove("active-btn");
        }
      });
    } else {
      // console.log("this.selectedRows", this.selectedRows);
      const ref = this.dialogService.open(EditBatchJobComponent, {
        header: "Edit Batch Job",
        data: this.selectedRows
      });
      ref.onClose.subscribe(params => {
        target.parentElement.classList.remove("active-btn");
        // console.log("params", params);
        this.transformToCron(params.scheduledTime, params.recurrence);
        // this.retentionService.addTag(params).subscribe();
      });
    }
  }

  transformToCron(date, recurrence) {
    //Seconds Minutes Hours DayofMonth Month DayofWeek Year
    let cron = "";
    const s = date.getSeconds(); //Seconds
    const minute = date.getMinutes(); //Minutes
    const h = date.getHours(); // Hours
    const d = date.getDate(); // DayofMonth
    const month = date.getMonth() + 1; // Month
    const w = date.getDay() + 1; // DayofWeek Sun:1 Mon:2 ,...Sat:7
    const y = date.getFullYear(); // Year

    switch (recurrence) {
      case "Year":
        cron = `${s} ${minute} ${h} ${d} ${month} ? *`;
        break;
      case "Month":
        cron = `${s} ${minute} ${h} ${d} * ? ${y}`;
        break;
      case "Week":
        cron = `${s} ${minute} ${h} ? * ${w} ${y}`;
        break;
      case "Day":
        cron = `${s} ${minute} ${h} * * ? ${y}`;
    }
    console.log("date:", date, "recurrence:", recurrence, "cron:", cron);
    return cron;
  }

  handleExecute(target) {
    target.parentElement.classList.add("active-btn");
    // console.log(this.selectedRows);
    if (!this.selectedRows) {
      this.confirmService.confirm({
        message: "Please select a row of data.",
        header: "Confirmation",
        rejectVisible: false,
        accept: () => {
          target.parentElement.classList.remove("active-btn");
        },
        reject: () => {
          target.parentElement.classList.remove("active-btn");
        }
      });
    } else {
      if (!this.selectedRows.status) {
        this.confirmService.confirm({
          message: "Please ensure the job is active.",
          header: "Confirmation",
          rejectVisible: false,
          accept: () => {
            target.parentElement.classList.remove("active-btn");
          },
          reject: () => {
            target.parentElement.classList.remove("active-btn");
          }
        });
      } else {
        // console.log("execute");
      }
    }
  }

  searchBatchJob(data) {
    // console.log("data", data);
  }

  handleAdd() {
    // console.log("add batch job");
    const ref = this.dialogService.open(AddBatchJobComponent, {
      header: "add Batch Job"
    });
  }
}
