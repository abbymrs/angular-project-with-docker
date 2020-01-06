import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { StateService } from 'src/app/shared/service/state.service';
import { userModel } from 'src/app/shared/model/user.model';
import { UtilService } from '../../../../shared/service/util.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {

  password: string;
  selectedUser: userModel;
  inputControls = [
    { type: 'password', model: this.password, className: 'password', controlName: 'password', placeholder: 'password', isRequired: true },
  ];

  @ViewChild('changePasswordForm', { static: false }) changePasswordForm: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private state: StateService,
    private utilService: UtilService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.state.editingItem$.subscribe((user: userModel) => {
      this.selectedUser = user;
    });
  }

  ngAfterViewInit(): void {
    (<HTMLInputElement>document.querySelector('.password')).focus();
  }

  changPassword() {
    if (this.changePasswordForm.form.valid) {
      const responseData = {
        username: this.selectedUser.username,
        password: this.changePasswordForm.form.value.password
      };
      this.ref.close();
      this.userService.changePassword(responseData)
        .subscribe(res => {
          this.ref.close({ ...responseData, ...res });
        }, err => {
          this.ref.close(err);
        });
    } else {
      this.utilService.validateForm('.change-password-form');
    }
  }
}
