import { OrderFormComponent } from './order-page/order-form/order-form.component'
import { OrderPageComponent } from './order-page/order-page.component'
import { DoctorFormComponent } from './doctor-page/doctor-form/doctor-form.component'
import { ServiceFormComponent } from './service-page/service-form/service-form.component'
import { ServicePageComponent } from './service-page/service-page.component'
import { DoctorPageComponent } from './doctor-page/doctor-page.component'
import { PatientPageComponent } from './patient-page/patient-page.component'
import { HistoryPageComponent } from './history-page/history-page.component'
import { OverviewPageComponent } from './overview-page/overview-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { AuthGuard } from './shared/classes/auth.quard'
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { PatientFormComponent } from './patient-page/patient-form/patient-form.component'

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewPageComponent },
      { path: 'history', component: HistoryPageComponent },
      { path: 'patient', component: PatientPageComponent },
      { path: 'patient/new', component: PatientFormComponent },
      { path: 'patient/:id', component: PatientFormComponent },
      { path: 'doctor', component: DoctorPageComponent },
      { path: 'doctor/new', component: DoctorFormComponent },
      { path: 'doctor/:id', component: DoctorFormComponent },
      { path: 'service', component: ServicePageComponent },
      { path: 'service/new', component: ServiceFormComponent },
      { path: 'service/:id', component: ServiceFormComponent },
      {
        path: 'order',
        component: OrderPageComponent,
      },
      { path: 'order/new', component: OrderFormComponent },
      { path: 'order/:id', component: OrderFormComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
