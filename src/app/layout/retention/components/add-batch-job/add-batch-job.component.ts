import { Component, OnInit, ViewChild } from "@angular/core";
import { DynamicDialogRef } from "primeng/api";

@Component({
  selector: "app-add-batch-job",
  templateUrl: "./add-batch-job.component.html",
  styleUrls: ["./add-batch-job.component.scss"]
})
export class AddBatchJobComponent implements OnInit {
  inputControls = [
    {
      controlName: "tenant_name",
      model: "",
      type: "text",
      isRequired: true,
      isDisabled: false,
      placeholder: "Tenant Name"
    },
    {
      controlName: "tenant_type",
      model: "",
      type: "text",
      isRequired: true,
      isDisabled: false,
      placeholder: "Tenant Type"
    }
  ];

  @ViewChild("addBatchJobForm", { static: false }) form;
  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {}

  saveAdd() {
    console.log("this.form.form.value", this.form.form.value);
    this.ref.close(this.form.form.value);
  }
}
