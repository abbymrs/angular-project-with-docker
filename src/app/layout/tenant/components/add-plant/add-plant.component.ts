import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DynamicDialogRef } from "primeng/api";
import { UtilService } from "../../../../shared/service/util.service";

@Component({
  selector: "app-add-plant",
  templateUrl: "./add-plant.component.html",
  styleUrls: ["./add-plant.component.scss"]
})
export class AddPlantComponent implements OnInit {
  plantModal = {
    customer: "",
    tenant_name: "",
    media_size: "",
    repository_type: "",
    description: ""
  };

  inputControls = [
    {
      controlName: "customer",
      labelName: "Customer",
      optionsData: [
        { id: "AMAZON_S3", value: "AMAZON_S3" },
        { id: "LOCAL_MEDIA_STORAGE", value: "LOCAL_MEDIA_STORAGE" }
      ],
      model: this.plantModal.customer,
      type: "select",
      isRequired: true,
      isDisabled: false
    },
    {
      controlName: "tenant_name",
      model: this.plantModal.tenant_name,
      type: "text",
      isRequired: true,
      isDisabled: false,
      placeholder: "Tenant Name"
    },
    {
      controlName: "media_size",
      model: this.plantModal.media_size,
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
      model: this.plantModal.repository_type,
      type: "select",
      isRequired: true,
      isDisabled: false
    },
    {
      controlName: "description",
      model: this.plantModal.description,
      className: "description form-textarea",
      type: "textarea",
      isRequired: false,
      isDisabled: false,
      placeholder: "Description"
    }
  ];

  @ViewChild("addPlantForm", { static: false }) plantForm: NgForm;

  constructor(public ref: DynamicDialogRef, private utilService: UtilService) {}

  ngOnInit() {}

  savePlant() {
    if (this.plantForm.form.valid) {
      this.ref.close(this.plantForm.form.value);
    } else {
      this.utilService.validateForm(".add-plant-form");
    }
  }
}
