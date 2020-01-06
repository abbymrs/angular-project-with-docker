import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DynamicDialogRef } from "primeng/api";
import { DynamicDialogConfig } from "primeng/api";
import { UtilService } from "../../../../shared/service/util.service";

@Component({
  selector: "app-edit-tenant",
  templateUrl: "./edit-tenant.component.html",
  styleUrls: ["./edit-tenant.component.scss"]
})
export class EditTenantComponent implements OnInit, AfterViewInit {
  tenantModal = {
    tenant_key: "",
    tenant_name: "",
    tenant_type: "",
    customer: "",
    plant: "",
    repository_type: "",
    media_size: "",
    description: "",
    status: ""
  };
  tenant: any;
  inputControls: any[];

  @ViewChild("editTenantForm", { static: false }) tenantForm: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    const data = this.config.data;
    this.tenant = data;
    console.log("data", data);
    this.inputControls = [
      {
        controlName: "tenant_key",
        model: data.tenant_key,
        type: "text",
        isRequired: false,
        isDisabled: true,
        placeholder: "Tenant Key"
      },
      {
        controlName: "tenant_name",
        model: data.tenant_name,
        type: "text",
        isRequired: false,
        isDisabled: true,
        placeholder: "Tenant Name"
      },
      {
        controlName: "tenant_type",
        labelName: "Tenant Type",
        optionsData: [
          { id: "Customer", value: "Customer" },
          { id: "Plant", value: "Plant" },
          { id: "Site", value: "Site" }
        ],
        model: "data.tenant_type",
        type: "select",
        isRequired: false,
        isDisabled: true
      },
      {
        controlName: "customer",
        model: data.customer,
        type: "text",
        isRequired: false,
        isDisabled: true,
        placeholder: "Customer"
      },
      {
        controlName: "plant",
        model: data.plant,
        type: "text",
        isRequired: false,
        isDisabled: true,
        placeholder: "Plant"
      },
      {
        controlName: "repository_type",
        labelName: "Repository Type",
        optionsData: [
          { id: "AMAZON_S3", value: "AMAZON_S3" },
          { id: "LOCAL_MEDIA_STORAGE", value: "LOCAL_MEDIA_STORAGE" }
        ],
        model: data.repository_type,
        type: "select",
        isRequired: true,
        isDisabled: false
      },
      {
        controlName: "media_size",
        model: data.media_size,
        type: "text",
        isRequired: true,
        placeholder: "Media Size(M)"
      },
      {
        controlName: "description",
        model: data.description,
        className: "description form-textarea",
        type: "textarea",
        isRequired: true,
        placeholder: "Description"
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
      this.utilService.handleFormItemStatus(this.tenant);
    }, 0);
  }

  saveTenant() {
    if (this.tenantForm.form.valid) {
      console.log("form", this.tenantForm.form);
      this.ref.close(this.tenantForm.form.value);
    } else {
      // console.log("ref", data);
      this.utilService.validateForm(".edit-tenant-form");
    }
  }
}
