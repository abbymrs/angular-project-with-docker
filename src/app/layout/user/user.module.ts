import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UserRoutingModule
  ],
  entryComponents: [
    AddUserComponent,
    EditUserComponent,
    ChangePasswordComponent
  ]
})
export class UserModule { }
