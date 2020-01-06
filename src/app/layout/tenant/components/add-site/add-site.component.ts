import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DynamicDialogRef } from "primeng/api";
import { UtilService } from "../../../../shared/service/util.service";

@Component({
  selector: "app-add-site",
  templateUrl: "./add-site.component.html",
  styleUrls: ["./add-site.component.scss"]
})
export class AddSiteComponent implements OnInit {
  SiteModal = {
    customer: "",
    plant: "",
    tenant_name: "",
    media_size: "",
    repository_type: "",
    description: ""
  };

  inputControls = [
    {
      controlName: "customer",
      labelName: " Customer ",
      optionsData: [
        { id: "customer1", value: "customer1" },
        { id: "customer2", value: "customer2" }
      ],
      model: this.SiteModal.customer,
      type: "select",
      isRequired: true,
      isDisabled: false
    },
    {
      controlName: "plant",
      labelName: " Plant ",
      optionsData: [
        { id: "plant1", value: "plant1" },
        { id: "plant2", value: "plant2" }
      ],
      model: this.SiteModal.customer,
      type: "select",
      isRequired: true,
      isDisabled: false
    },
    {
      controlName: "tenant_name",
      model: this.SiteModal.tenant_name,
      type: "text",
      isRequired: true,
      isDisabled: false,
      placeholder: "Tenant Name"
    },
    {
      controlName: "media_size",
      model: this.SiteModal.media_size,
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
      model: this.SiteModal.repository_type,
      type: "select",
      isRequired: true,
      isDisabled: false
    },
    {
      controlName: "description",
      model: this.SiteModal.description,
      className: "description form-textarea",
      type: "textarea",
      isRequired: false,
      isDisabled: false,
      placeholder: "Description"
    }
  ];

  @ViewChild("addSiteForm", { static: false }) siteForm: NgForm;
  constructor(public ref: DynamicDialogRef, private utilService: UtilService) {}

  ngOnInit() {}

  saveSite() {
    if (this.siteForm.form.valid) {
      this.ref.close(this.siteForm.form.value);
    } else {
      this.utilService.validateForm(".add-site-form");
    }
  }
}
