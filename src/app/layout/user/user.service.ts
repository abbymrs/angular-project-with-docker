import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BASEURL, PAGESIZE } from "../../shared/config";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList({ username = '', email = '', currentPage = 1 }): Observable<any> {
    return this.http.get(`/user/queryUserByCondition?username=${username}&email=${email}&page_size=${PAGESIZE}&current_page=${currentPage}`);
    // return this.http.get(`/assets/mock/user-list.json`);
  }

  addUser(payload: Object): Observable<any> {
    return this.http.post(`/user/addUser`, payload);
  }

  updateUser(payload: Object): Observable<any> {
    return this.http.put(`/user/editUserInfo`, payload);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`/user/deleteUserInfo?username=${username}`);
  }

  changePassword({ username, password }): Observable<any> {
    return this.http.put(`/user/changePassword?username=${username}&new_password=${password}`, {});
  }
}
