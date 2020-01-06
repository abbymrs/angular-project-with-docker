import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient
  ) { }

  getMediaList({ tenant_name = '', identifier = '', tag_name = '', file_name = '', start_time = '', finish_time = '' }): Observable<any> {
    // return this.http.get('/assets/mock/multimedia-list.json');
    return this.http.get(`multimediatest/mediaapi/Admin/media?tenant_name=${tenant_name}&identifier=${identifier}&tag_name=${tag_name}&file_name${file_name}=&start_time=${start_time}&finish_time=${finish_time}`);
  }
}
