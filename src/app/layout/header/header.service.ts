import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BASEURL, PAGESIZE } from "../../shared/config";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private http: HttpClient
  ) { }

  signOut(): Observable<any> {
    return this.http.get(`/user/logout`);
  }
}
