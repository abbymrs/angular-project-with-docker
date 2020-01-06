import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { DynamicDialogRef } from "primeng/api";
import { UtilService } from "../../../../shared/service/util.service";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"]
})
export class AddCustomerComponent implements OnInit, AfterViewInit {
  customerModal = {
    tenant_name: "",
    media_size: "",
    repository_type: "",
    description: ""
  };

  inputControls = [
    {
      controlName: "tenant_name",
      model: this.customerModal.tenant_name,
      type: "text",
      isRequired: true,
      isDisabled: false,
      placeholder: "Tenant Name"
    },
    {
      controlName: "media_size",
      model: this.customerModal.media_size,
      type: "text",
      isRequired: true,
      isDisabled: false,
      placeholder: "Media Size(M)"
    },
    {
      controlName: "repository_type",
      labelName: "Repository Type",
      optionsData: [
        { id: "AMAZON_S3", value: "AMAZON_S3" },
        { id: "LOCAL_MEDIA_STORAGE", value: "LOCAL_MEDIA_STORAGE" }
      ],
      model: this.customerModal.repository_type,
      type: "select",
      isRequired: true,
      isDisabled: false
    },
    {
      controlName: "description",
      model: this.customerModal.description,
      className: "description form-textarea",
      type: "textarea",
      isRequired: false,
      isDisabled: false,
      placeholder: "Description"
    }
  ];
  @ViewChild("addCustomerForm", { static: false }) customerForm: NgForm;

  constructor(public ref: DynamicDialogRef, private utilService: UtilService) {}
  ngOnInit() {}
  ngAfterViewInit() {}

  saveCustomer() {
    if (this.customerForm.form.valid) {
      this.ref.close(this.customerForm.form.value);
    } else {
      this.utilService.validateForm(".add-customer-form");
    }
  }
}
