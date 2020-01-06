import { Injectable } from "@angular/core";
import { tenantList } from "./tenant-list";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TenantService {
  tenantListData;

  constructor(private http: HttpClient) {}

  getTenantList(params): Observable<any> {
    return this.http.get("/tenant/queryTenantByCondition", { params: params });
    // return this.http.get("assets/mock/tenant-list.json");
  }

  getCustomer(): Observable<any> {
    return this.http.get("/tenant/queryAllCustomers");
  }

  getSite(params): Observable<any> {
    return this.http.get("/tenant/queryAllCustomers", { params });
  }

  addCustomer(params): Observable<any> {
    // const params = { tenantName, mediaSize, repositoryType, description };
    return this.http.post("/tenant/addCustomer", params);
  }

  addPlant(params): Observable<any> {
    return this.http.post("/tenant/addPlant", params);
  }

  addSite(params): Observable<any> {
    return this.http.post("/tenant/addSite", params);
  }

  editTenant(params): Observable<any> {
    return this.http.post("/tenant/editTenantInfo", params);
  }
}
