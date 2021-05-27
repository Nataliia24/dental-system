import { AppComponent } from './app.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { TokenInterceptor } from './shared/classes/token.interceptor'
import { OverviewPageComponent } from './overview-page/overview-page.component'
import { HistoryPageComponent } from './history-page/history-page.component'
import { PatientPageComponent } from './patient-page/patient-page.component'
import { DoctorPageComponent } from './doctor-page/doctor-page.component'
import { ServicePageComponent } from './service-page/service-page.component'
import { ServiceFormComponent } from './service-page/service-form/service-form.component'
import { DoctorFormComponent } from './doctor-page/doctor-form/doctor-form.component'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { CommonModule, DatePipe } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoaderComponent } from './shared/components/loader/loader.component'
import { PatientFormComponent } from './patient-page/patient-form/patient-form.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { OrderPageComponent } from './order-page/order-page.component'
import { OrderFormComponent } from './order-page/order-form/order-form.component'
import { FullCalendarModule } from '@fullcalendar/angular'
import { ChartModule } from 'angular2-chartjs'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    HistoryPageComponent,
    PatientPageComponent,
    DoctorPageComponent,
    ServicePageComponent,
    LoaderComponent,
    ServiceFormComponent,
    DoctorFormComponent,
    PatientFormComponent,
    OrderPageComponent,
    OrderFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
