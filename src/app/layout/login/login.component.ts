import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { StateService } from 'src/app/shared/service/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  arrayItems = [];
  isWithoutVal = false;
  isLoginFailed = false;
  loginFailedMsg: string;

  errorMessages = [
    {
      control: 'username',
      msg: 'Please input your user name'
    },
    {
      control: 'password',
      msg: 'Please input your password'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private state: StateService
  ) { }

  ngOnInit() {
    this.arrayItems = this.controls;
  }

  getErrorMsg(controlName) {
    return this.errorMessages.filter(item => item.control === controlName)[0].msg;
  }

  private get controls() {
    const controls = this.loginForm.controls;
    for (let control in controls) {
      this.arrayItems.push({
        name: control,
        type: control === 'password' ? 'password' : 'text',
        value: controls[control],
        errorMsg: this.getErrorMsg(control)
      });
    }
    return this.arrayItems;
  }

  removeError(controlName) {
    this.arrayItems.forEach(item => {
      if (item.name === controlName) item.errorMsg = '';
    });
    this.isWithoutVal = false;
  }

  validate(controlName) {
    this.arrayItems.forEach(item => {
      if (item.name === controlName) item.errorMsg = this.getErrorMsg(controlName)
    });
  }

  onSubmit() {
    const isEmpty = this.isObjectValueEmpty(this.loginForm.value);

    if (isEmpty && this.loginForm.pristine) {
      this.isWithoutVal = true;
    } else {
      this.isWithoutVal = false;
    }
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe(res => {
          if (res.code === 0) {
            this.isLoginFailed = false;
            this.router.navigate(['/layout/tenant']);
            this.state.updateUserName(res.username);
            this.state.toggleLogin(true);
          } else {
            this.isLoginFailed = true;
            this.loginFailedMsg = res.msg;
            this.state.toggleLogin(false);
          }
        }, err => {
          const error = err.error;
          this.state.toggleLogin(false);
          if (error.code === 1) {
            this.isLoginFailed = true;
            this.loginFailedMsg = error.msg;
          }
        })
    }
  }

  isObjectValueEmpty(obj) {
    let emptyArr = [];
    for (let prop in obj) {
      if (!obj[prop].trim()) {
        emptyArr.push(true);
      } else {
        emptyArr.push(false);
      }
    }
    return emptyArr.every(item => item === true);
  }
}
