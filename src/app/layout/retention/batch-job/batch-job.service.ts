import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class BatchJobService {
  constructor(private http: HttpClient) {}

  getBatchJobList(): Observable<any> {
    return this.http.get("assets/mock/batch-job-list.json");
  }
}
