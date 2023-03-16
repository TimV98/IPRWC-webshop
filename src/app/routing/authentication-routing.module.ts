import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../security/login/login.component";
import {UserProfileComponent} from "../security/user-profile/user-profile.component";
import {UserProfileEditComponent} from "../security/user-profile/user-profile-edit/user-profile-edit.component";
import {AdminProfileComponent} from "../security/admin-profile/admin-profile.component";
import {AdminUserListComponent} from "../security/admin-profile/admin-user-list/admin-user-list.component";
import {AdminItemListComponent} from "../security/admin-profile/admin-item-list/admin-item-list.component";
import {
  AdminEditUserComponent
} from "../security/admin-profile/admin-user-list/admin-user-item/admin-edit-user/admin-edit-user.component";
import {
  AdminItemFormComponent
} from "../security/admin-profile/admin-item-list/admin-item/admin-item-form/admin-item-form.component";
import {RegisterComponent} from "../security/register/register.component";
import {AuthAdminGuard} from "../guards/auth-admin.guard";
import {AuthUserGuard} from "../guards/auth-user-guard";
import {OrderOverviewComponent} from "../security/user-profile/order-overview/order-overview.component";
import {
  OrderDetailsComponent
} from "../security/user-profile/order-overview/order-list/order-list-item/order-details/order-details.component";

const securityRoutes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthUserGuard]},
  {path: 'profile/edit', component: UserProfileEditComponent, canActivate: [AuthUserGuard]},
  {path: 'orders', component:OrderOverviewComponent, canActivate: [AuthUserGuard]},
  {path: 'orders/:id/details', component: OrderDetailsComponent, canActivate: [AuthUserGuard]},
  {
    path: 'admin',
    component: AdminProfileComponent,
    canActivate: [AuthAdminGuard],
    canActivateChild: [AuthAdminGuard],
    children: [
      {path: 'userlist', component: AdminUserListComponent},
      {path: 'products', component: AdminItemListComponent},
      {path: 'userlist/:id/edit', component: AdminEditUserComponent},
      {path: 'products/add', component: AdminItemFormComponent},
      {path: 'products/:id/edit', component: AdminItemFormComponent}
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(securityRoutes)
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
