import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BASEURL, PAGESIZE } from "../../shared/config";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login({ username, password }): Observable<any> {
    return this.http.get(`${BASEURL}user/login?username=${username}&password=${password}`);
  }
}
