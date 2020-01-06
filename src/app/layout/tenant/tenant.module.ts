import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TenantRoutingModule } from "./tenant-routing.module";
import { TenantComponent } from "./tenant.component";
import { SharedModule } from "../../shared/shared.module";
import { AddCustomerComponent } from "./components/add-customer/add-customer.component";
import { AddPlantComponent } from "./components/add-plant/add-plant.component";
import { AddSiteComponent } from "./components/add-site/add-site.component";
import { EditTenantComponent } from "./components/edit-tenant/edit-tenant.component";

@NgModule({
  declarations: [
    TenantComponent,
    AddCustomerComponent,
    AddPlantComponent,
    AddSiteComponent,
    EditTenantComponent
  ],
  imports: [CommonModule, TenantRoutingModule, SharedModule],
  entryComponents: [
    AddCustomerComponent,
    AddPlantComponent,
    AddSiteComponent,
    EditTenantComponent
  ]
})
export class TenantModule {}
