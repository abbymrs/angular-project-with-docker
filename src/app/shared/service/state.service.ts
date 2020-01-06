import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { userModel } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _loginObservable = new BehaviorSubject<boolean>(false);
  isLogin$ = this._loginObservable.asObservable();

  private _redirectUrlObservable = new BehaviorSubject<string>('');
  redirectUrl$ = this._redirectUrlObservable.asObservable();

  private _editingItemObservable = new BehaviorSubject<any>(<any>{});
  editingItem$ = this._editingItemObservable.asObservable();

  private _titleObservable = new BehaviorSubject<string>('Tenant');
  title$ = this._titleObservable.asObservable();

  private _userNameObservable = new BehaviorSubject<string>('');
  username$ = this._userNameObservable.asObservable();

  isOpenMenu = true;

  toggleLogin(isLogin: boolean) {
    this._loginObservable.next(isLogin);
  }

  setRedirectUrl(url: string) {
    this._redirectUrlObservable.next(url);
  }

  updateEditItem(item: any) {
    this._editingItemObservable.next(item);
  }

  resetTitle(title: string) {
    this._titleObservable.next(title);
  }

  updateUserName(username: string) {
    this._userNameObservable.next(username);
  }
}
