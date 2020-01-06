import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { UtilService } from '../../../../shared/service/util.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements AfterViewInit {
  userModel = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
    deparment: '',
    remarks: ''
  };
  inputControls = [
    { type: 'text', model: this.userModel.username, className: 'username', controlName: 'username', placeholder: 'user name', isRequired: true },
    { type: 'password', model: this.userModel.password, className: 'password', controlName: 'password', placeholder: 'password', isRequired: true },
    { type: 'password', model: this.userModel.confirmPassword, className: 'confirm-password', controlName: 'confirm_password', placeholder: 'confirm password', isRequired: true },
    { type: 'email', model: this.userModel.email, className: 'email', controlName: 'email', placeholder: 'email', isRequired: true },
    { type: 'text', model: this.userModel.first_name, className: 'first-name', controlName: 'first_name', placeholder: 'first name' },
    { type: 'text', model: this.userModel.last_name, className: 'last-name', controlName: 'last_name', placeholder: 'last name' },
    { type: 'text', model: this.userModel.deparment, className: 'department', controlName: 'department', placeholder: 'department' },
    { type: 'textarea', model: this.userModel.remarks, className: 'remarks form-textarea', controlName: 'remarks', placeholder: 'remarks' }
  ];
  @ViewChild('addUserForm', { static: false }) userForm: NgForm;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private utilService: UtilService,
    private userService: UserService
  ) { }

  ngAfterViewInit(): void {
    this.validateConfirmPassword();
    (<HTMLInputElement>document.querySelector('.add-user-form .username')).focus();
  }

  saveUser() {
    const formData = this.userForm.form.value;
    const hasError = document.querySelectorAll('.add-user-form .error').length > 0;

    if (this.userForm.form.valid && !hasError) {
      this.ref.close();
      const payload = {};
      for (let prop in formData) {
        if (prop !== 'id' && prop !== 'confirmPassword') {
          payload[prop] = formData[prop];
        }
      }
      this.userService.addUser(payload)
        .subscribe(res => {
          this.ref.close({ ...formData, ...res });
        }, err => {
          this.ref.close(err);
        })

    } else {
      this.utilService.validateForm('.add-user-form');
    }
  }

  validateConfirmPassword() {
    const form = document.querySelector('.add-user-form');
    const passwordInput = <HTMLInputElement>form.querySelector('.password');
    const confirmPwdInput = <HTMLInputElement>form.querySelector('.confirm-password');
    const _this = this;

    // validate password and confirm password are matchable or not
    confirmPwdInput.addEventListener('blur', function () {
      const inputContainer = this.parentElement;

      if (passwordInput.value.trim() !== this.value.trim()) {
        _this.utilService.generateErrMsg(
          inputContainer,
          this,
          "your password is not matchable!"
        );
        inputContainer.style.marginBottom = "30px";
        inputContainer.classList.add('input-container-error');
      }
    });
    confirmPwdInput.addEventListener("focus", function () {
      const inputContainer = this.parentElement;
      const sibling = this.previousElementSibling;
      sibling && sibling.classList.remove('error');

      const error = inputContainer.querySelector(".error")
        ;
      if (error) inputContainer.removeChild(error);
      inputContainer.style.marginBottom = "10px";
      inputContainer.classList.remove('input-container-error');
    });
  }
}
