// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
// import { HomeComponent } from './pages/home/home.component';
// import { UserComponent } from './pages/user/user.component';
// // import { DashboardComponent } from './pages/dashboard/dashboard.component';

// // CoreUI Modules
// // CoreUI Modules
// import {
//   SidebarModule,
//   NavModule,
//   HeaderModule,
//   FooterModule,
//   CardModule,
//   ButtonModule,
// } from '@coreui/angular';
// import { IconModule } from '@coreui/icons-angular';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// // import { SidebarComponent } from './sidebar/sidebar.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   // { path: 'dashboard', component: DashboardComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'user', component: UserComponent },
//   { path: '**', redirectTo: 'dashboard' },
// ];
// @NgModule({
//   declarations: [
//     AppComponent,
//     HomeComponent,
//     UserComponent,
//     // DashboardComponent,
//     // SidebarComponent,
//   ],
//   imports: [
//     BrowserModule,
//     RouterModule.forRoot(routes),
//     SidebarModule,
//     NavModule,
//     HeaderModule,
//     FooterModule,
//     CardModule,
//     ButtonModule,
//     IconModule,
//     BrowserAnimationsModule,
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MatCardModule } from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { MatTableModule } from '@angular/material/table';
import { ConfirmLogoutDialogComponent } from './shared/dialogs/confirm-logout-dialog/confirm-logout-dialog.component';

import { SharedModule } from './shared/shared.module';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'user', component: UserComponent },
      { path: 'user/create', component: CreateUserComponent },
      { path: 'user/edit/:id', component: EditUserComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
    canActivate: [NoAuthGuard],
  },
  // Redirect invalid routes
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    CreateUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule, // <-- harus ada ini
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
