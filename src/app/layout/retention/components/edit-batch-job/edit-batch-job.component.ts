import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { DynamicDialogRef } from "primeng/api";
import { DynamicDialogConfig } from "primeng/api";
import { UtilService } from "src/app/shared/service/util.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-edit-batch-job",
  templateUrl: "./edit-batch-job.component.html",
  styleUrls: ["./edit-batch-job.component.scss"]
})
export class EditBatchJobComponent implements OnInit, AfterViewInit {
  job;
  inputControls;
  @ViewChild("editBatchJobForm", { static: false }) batchJobForm: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    // console.log("config", this.config.data.data);
    const data = this.config.data;
    this.job = data;
    this.inputControls = [
      {
        controlName: "tenantName",
        model: data.tenantName,
        type: "text",
        isRequired: true,
        isDisabled: true,
        placeholder: "Tenant Name"
      },
      {
        controlName: "tenantType",
        labelName: "Tenant Type",
        optionsData: [
          { id: "Customer", value: "Customer" },
          { id: "Plant", value: "Plant" },
          { id: "Site", value: "Site" }
        ],
        model: data.tenantType,
        type: "select",
        isRequired: true,
        isDisabled: true
      },
      {
        controlName: "scheduledTime",
        placeholder: "Scheduled Time",
        // model: new Date(data.scheduledTimes),
        model: isNaN(new Date(data.scheduledTimes).getTime())
          ? ""
          : new Date(data.scheduledTimes),
        type: "calendar",
        isRequired: true,
        isDisabled: false,
        minDate: new Date()
      },
      {
        controlName: "recurrence",
        placeholder: "Recurrence",
        labelName: "Recurrence",
        optionsData: [
          { id: "Year", value: "Year" },
          { id: "Month", value: "Month" },
          { id: "Week", value: "Week" },
          { id: "Day", value: "Day" }
        ],
        model: data.recurrence,
        type: "select",
        isRequired: true,
        isDisabled: false
      },
      {
        controlName: "status",
        labelName: "Status",
        optionsData: [
          { id: 1, value: "Active" },
          { id: 0, value: "Inactive" }
        ],
        model: data.status,
        type: "select",
        isRequired: true,
        isDisabled: false
      }
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.utilService.handleFormItemStatus(this.job);
    }, 0);
  }

  saveEdit() {
    if (this.batchJobForm.form.valid) {
      this.ref.close(this.batchJobForm.form.value);
    } else {
      this.utilService.validateForm(".edit-batch-job");
    }
  }
}
