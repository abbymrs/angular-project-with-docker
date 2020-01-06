import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/service/util.service';
import { TagModel, TagResponse } from './models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class RetentionService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  getTagList({ tag_name = "", tag_description = "" }): Observable<any> {
    return this.http.get(`/multimediatest/mediaapi/Admin/Tag?tag_name=${tag_name}&tag_description=${tag_description}`);
  }

  addTag(payload: TagModel): Observable<any> {
    return this.http.post('/multimediatest/mediaapi/Admin/addTag', payload);
  }

  editTag(payload: TagModel): Observable<any> {
    return this.http.put('/multimediatest/mediaapi/Admin/updateTag', payload);
  }

  deleteTag(tagName: string): Observable<any> {
    return this.http.delete(`/multimediatest/mediaapi/Admin/deleteTag/${tagName}`);
  }

  getLogList(): Observable<any> {
    return this.http.get('assets/mock/batch-job-log-list.json');
  }

  validateFormWithMinVal(ngFrom, inputControls, ref, formSelector, isAdding = true, tag_key = 0) {
    const formData = ngFrom.form.value;
    const numnerInputs = inputControls.filter(control => (control.controlName === 'live_retention' || control.controlName === 'cold_retention'));
    const liveRetentionMinVal = numnerInputs[0].minNumber;
    const coldRetentionMinVal = numnerInputs[1].minNumber;

    if (ngFrom.form.valid) {
      ref.close();
      const payload = <TagModel>{};
      let response = <TagResponse>{
        success: false,
        message: "",
        data: {}
      };

      for (let prop in formData) {
        const curVal = formData[prop];
        if (prop === 'live_retention' && Number(curVal) < liveRetentionMinVal) {
          payload[prop] = liveRetentionMinVal;
        } else if (prop === 'cold_retention' && Number(curVal) < coldRetentionMinVal) {
          payload[prop] = coldRetentionMinVal;
        } else if (prop === 'status') {
          payload[prop] = formData[prop];
        } else {
          payload[prop] = curVal;
        }
      }
      let serviceString = 'addTag';

      if (!isAdding) {
        serviceString = 'editTag'
        payload.tag_key = tag_key;
      }

      this[serviceString](payload)
        .subscribe(res => {
          response.success = res.success;
          response.message = res.success ? res.data.message : res.message;
          response.data.tag_key = res.data.tag_key;
          ref.close({ ...payload, ...response });
        }, err => {
          ref.close(err);
        })


    } else {
      this.utilService.validateForm(formSelector);
    }
  }
}
