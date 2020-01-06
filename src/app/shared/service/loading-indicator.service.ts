import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  onLoadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private requestList: HttpRequest<any>[] = [];

  constructor() { }

  start(req: HttpRequest<any>) {
    this.requestList.push(req);
    this.notify();

  }

  finish(req: HttpRequest<any>) {
    const idx = this.requestList.indexOf(req);
    if (idx > -1) {
      this.requestList.splice(idx, 1);
    }
    this.notify();
  }

  notify() {
    this.onLoadingChange.emit(this.requestList.length !== 0);
  }
}