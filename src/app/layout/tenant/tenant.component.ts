import { Component, OnInit } from "@angular/core";
import { Tenant } from "./Tenant";
import { TenantService } from "./tenant.service";
import { inputItem } from "../../shared/model/input.model";
import { DialogService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { AddCustomerComponent } from "./components/add-customer/add-customer.component";
import { AddPlantComponent } from "./components/add-plant/add-plant.component";
import { AddSiteComponent } from "./components/add-site/add-site.component";
import { EditTenantComponent } from "./components/edit-tenant/edit-tenant.component";
// import { tenantList } from "./tenant-list";
@Component({
  selector: "app-tenant",
  templateUrl: "./tenant.component.html",
  styleUrls: ["./tenant.component.scss"],
  providers: [DialogService, ConfirmationService]
})
export class TenantComponent implements OnInit {
  totalNumber: number;
  pageSize: number = 10;
  currentPage: number = 1;
  selectedRows: any = "";
  searchInputControls = [
    {
      type: "text",
      className: "tenant-name",
      controlName: "tenantName",
      placeholder: "Tenant Name"
    },
    {
      type: "text",
      className: "customer",
      controlName: "customer",
      placeholder: "Customer"
    },
    {
      type: "text",
      className: "plant",
      controlName: "plant",
      placeholder: "Plant"
    }
  ];

  cols: any[];
  tenantList: Tenant[];
  tenantNameControl = {
    controlName: "Tenant Name"
  };
  mediaSizeControl = {
    controlName: "Media Size"
  };
  display = false;

  constructor(
    private tenantService: TenantService,
    public dialogService: DialogService,
    public confirmService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "tenant_key", header: "Tenant Key" },
      { field: "tenant_name", header: "Tenant Name" },
      { field: "tenant_type", header: "Tenant Type" },
      { field: "customer", header: "Customer" },
      { field: "plant", header: "Plant" },
      { field: "repository_type", header: "Repository Type" },
      { field: "media_size", header: "Media Size(M)" },
      { field: "description", header: "Description" },
      { field: "status", header: "Status" }
    ];
    this.getTenantList();
  }

  getTenantList() {
    // pageSize=10&currentPage=1&plant=&tenantName=&customer=
    const params = {
      page_size: this.pageSize,
      current_page: this.currentPage,
      plant: "",
      tenant_name: "",
      customer: ""
    };
    this.tenantService.getTenantList(params).subscribe(res => {
      if (res.code === 0) {
        console.log("res", res);
        this.tenantList = res.data;
        this.totalNumber = res.total_number;
      }
    });
  }

  paginate(e) {
    console.log("e", e);
    this.currentPage = e.page + 1;
    this.getTenantList();
  }

  showCustomer(target) {
    target.parentElement.classList.add("active-btn");
    const ref = this.dialogService.open(AddCustomerComponent, {
      header: "Add Customer"
    });
    ref.onClose.subscribe(params => {
      target.parentElement.classList.remove("active-btn");
      console.log("params", params);
      // this.tenantService.addCustomer(params).subscribe(res => {
      //   if (res.code === 0) {
      //   }
      // });
    });
  }

  showMessages() {}

  showPlant(target) {
    target.parentElement.classList.add("active-btn");
    const ref = this.dialogService.open(AddPlantComponent, {
      header: "Add Plant"
    });
    ref.onClose.subscribe(params => {
      target.parentElement.classList.remove("active-btn");
      console.log("params", params);
      // this.tenantService.addPlant(params);
    });
  }

  showSite(target) {
    target.parentElement.classList.add("active-btn");
    const ref = this.dialogService.open(AddSiteComponent, {
      header: "Add Site"
    });
    ref.onClose.subscribe(params => {
      console.log("params", params);
      // this.tenantService.addSite(params);
      target.parentElement.classList.remove("active-btn");
    });
  }

  showEdit(target) {
    console.log("showEdit", this.selectedRows);
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
      const ref = this.dialogService.open(EditTenantComponent, {
        header: "Edit Tenant",
        data: this.selectedRows
      });

      ref.onClose.subscribe(params => {
        console.log("params", params);
        // this.tenantService.editTenant(params);
      });
    }
  }

  onRowSelect(data) {
    console.log("data", data);
    this.selectedRows = data.data;
  }

  onRowUnselect() {
    this.selectedRows = "";
  }

  searchTenant(data) {
    console.log("search", data);
  }
}
