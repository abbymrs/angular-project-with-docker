import { Component, OnInit } from '@angular/core';

import { ConfirmationService, DialogService, MessageService } from "primeng/api";
import { UserService } from './user.service';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { userModel } from 'src/app/shared/model/user.model';
import { StateService } from '../../shared/service/state.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ActivatedRoute } from '@angular/router';
import { PAGESIZE } from 'src/app/shared/config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    ConfirmationService,
    DialogService,
    MessageService
  ]
})
export class UserComponent implements OnInit {

  searchInputControls = [
    { type: 'text', className: 'search username', controlName: 'username', placeholder: 'user name' },
    { type: 'email', className: 'search email', controlName: 'email', placeholder: 'email' },
  ];
  userList: userModel[] = [];
  cols: any[];
  message: string;
  isAdding = false;
  isEditing = false;
  isDeleting = false;
  isChangePasswording = false;
  isShowRejectLabel = true;
  selectedUser: userModel;
  pageSize = PAGESIZE;
  totalNumber = 0;
  currentPage = 1;
  searchedUser: string;
  dialogTitle: string;
  acceptLabel = 'Yes';

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private state: StateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cols = [
      { field: "id", header: "ID" },
      { field: "username", header: "User Name" },
      { field: "email", header: "Email" },
      { field: "first_name", header: "First Name" },
      { field: "last_name", header: "Last Name" },
      { field: "department", header: "Department" },
      { field: "remarks", header: "Remarks" }
    ];
    this.userService.getUserList({})
      .subscribe(res => {
        this.totalNumber = res.total_number;
        this.updateUserList(res);
      }, err => {
        console.log(err);
      });
    this.route.data.subscribe(d => {
      this.state.resetTitle(d.title);
    });
  }

  paginate(currentPage) {
    this.currentPage = currentPage.page + 1;
    this.userService.getUserList({ currentPage: this.currentPage })
      .subscribe(res => {
        this.updateUserList(res, currentPage.page);
      }, err => {
        console.log(err);
      });
  }

  updateUserList(res, curPage = 0) {
    this.userList = res.data.map((user, idx) => {
      user.id = (idx + 1) + curPage * this.pageSize;
      return user;
    });
  }

  searchUser(searchVal) {
    this.userService.getUserList(searchVal)
      .subscribe(res => {
        this.totalNumber = res.total_number;
        this.updateUserList(res);
        this.searchedUser = searchVal.username;
      }, err => {
        console.log(err);
      });
  }

  addUser() {
    this.isAdding = true;
    const ref = this.dialogService.open(AddUserComponent, {
      header: 'Add User',
      width: '400px'
    });

    ref.onClose.subscribe((data: any) => {
      this.isAdding = false;
      if (data) {
        let messageType = 'info';
        if (data.code === 0) {
          // make sure when user is on other pagination pages, switch to first page when add user successfully
          if (this.currentPage !== 1) {
            const firstPage = <HTMLElement>document.querySelector('.ui-paginator-first');
            firstPage.click();
          }

          this.userList = [data, ...this.userList].map((user, idx) => {
            user.id = idx + 1;
            return user;
          });
          this.totalNumber++;
        } else {
          messageType = 'error';
        }
        this.messageService.add({ severity: messageType, summary: 'add user', detail: data.message });
      }
    });
  }

  editUser() {
    this.isEditing = true;
    this.dialogTitle = 'Edit User';

    if (this.selectedUser) {
      this.state.updateEditItem(this.selectedUser);
      const ref = this.dialogService.open(EditUserComponent, {
        header: 'Edit User',
        width: '400px'
      });

      ref.onClose.subscribe((data: any) => {
        this.isEditing = false;
        if (data) {
          let messageType = 'info';
          if (data.code === 0) {
            this.userList = this.userList.map(user => {
              if (user.username === data.username) {
                data.id = user.id;
                user = data;
              }
              return user;
            });

          } else {
            messageType = 'error';
          }
          this.messageService.add({ severity: messageType, summary: 'edit user', detail: data.message });

        }
      })
    } else {
      this.isShowRejectLabel = false;
      this.acceptLabel = 'OK';
      this.confirmationService.confirm({
        message: 'Please select a user that you want to edit~',
        accept: () => {
          this.isEditing = false;
        },
        reject: () => {
          this.isEditing = false;
        }
      });
    }
  }
  deleteUser() {
    this.isDeleting = true;
    this.dialogTitle = 'Delete User';
    if (this.selectedUser) {
      this.acceptLabel = 'Yes';
      this.isShowRejectLabel = true;
      this.confirmationService.confirm({
        message: `Are you sure that you want to delete user <strong>${this.selectedUser.username}</strong>?`,
        accept: () => {
          this.userService.deleteUser(this.selectedUser.username)
            .subscribe(res => {
              let messageType = 'info';
              this.isDeleting = false;

              if (res.code === 0) {
                const idx = this.userList.findIndex(user => user.username === this.selectedUser.username);
                if (idx !== -1) this.userList.splice(idx, 1);
                this.userList = [...this.userList];
                this.selectedUser = <any>{};
                this.totalNumber--;
              } else {
                messageType = 'error';
              }
              this.messageService.add({ severity: messageType, summary: 'delete user', detail: res.message });
            }, err => {
              this.isDeleting = false;
              this.messageService.add({ severity: 'error', summary: 'delete user', detail: err.message });
            })
        },
        reject: () => {
          this.isDeleting = false;
        }
      });
    } else {
      this.isShowRejectLabel = false;
      this.acceptLabel = 'OK';
      this.confirmationService.confirm({
        message: 'Please select a user that you want to delete~',
        accept: () => {
          this.isDeleting = false;
        },
        reject: () => {
          this.isDeleting = false;
        }
      });
    }
  }

  changePassword() {
    this.isChangePasswording = true;
    this.dialogTitle = 'Change Password';

    if (this.selectedUser) {
      this.state.updateEditItem(this.selectedUser);
      const ref = this.dialogService.open(ChangePasswordComponent, {
        header: 'Change Password',
        width: '400px'
      });

      ref.onClose.subscribe((data: any) => {
        this.isChangePasswording = false;
        if (data) {
          let messageType = 'info';
          if (data.code === 0) {
            this.userList = [...this.userList];
          } else {
            messageType = 'error';
          }
          this.messageService.add({ severity: messageType, summary: 'change password', detail: data.message });
        }
      });
    } else {
      this.isShowRejectLabel = false;
      this.acceptLabel = 'OK';
      this.confirmationService.confirm({
        message: 'Please select a user that you want to change password~',
        accept: () => {
          this.isChangePasswording = false;
        },
        reject: () => {
          this.isChangePasswording = false;
        }
      });
    }
  }
}
