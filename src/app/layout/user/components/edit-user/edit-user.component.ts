import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

import { userModel } from 'src/app/shared/model/user.model';
import { StateService } from 'src/app/shared/service/state.service';
import { UserService } from '../../user.service';
import { UtilService } from '../../../../shared/service/util.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, AfterViewInit {

  inputControls = [];
  user = <userModel>{};
  @ViewChild('editUserForm', { static: false }) userForm: NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private state: StateService,
    private utilService: UtilService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.state.editingItem$.subscribe((user: userModel) => {
      this.user = user;
      this.inputControls = [
        { type: 'text', model: user.username, isDisabled: true, className: 'username', controlName: 'username', placeholder: 'user name' },
        { type: 'email', model: user.email, className: 'email', controlName: 'email', placeholder: 'email', isRequired: true },
        { type: 'text', model: user.first_name, className: 'first-name', controlName: 'first_name', placeholder: 'first name' },
        { type: 'text', model: user.last_name, className: 'last-name', controlName: 'last_name', placeholder: 'last name' },
        { type: 'text', model: user.department, className: 'department', controlName: 'department', placeholder: 'department' },
        { type: 'textarea', model: user.remarks, className: 'remarks form-textarea', controlName: 'remarks', placeholder: 'remarks' }
      ];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.utilService.handleFormItemStatus(this.user);
    }, 0);
  }

  saveUser() {
    const formData = this.userForm.form.value;
    if (this.userForm.form.valid) {
      this.ref.close();
      this.userService.updateUser(formData)
        .subscribe(res => {
          this.ref.close({ ...formData, ...res });
        }, err => {
          this.ref.close(err);
        });
    } else {
      this.utilService.validateForm('.edit-user-form');
    }
  }

}
