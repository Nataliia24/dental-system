import { Message } from './../../shared/interfaces'
import { MaterialService } from 'src/app/shared/classes/material.service'
import { ServicesService } from './../../shared/services/services.service'
import { DoctorsService } from './../../shared/services/doctors.service'
import { PatientsService } from './../../shared/services/patients.service'
import { OrdersService } from './../../shared/services/orders.service'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Doctor, Order, Patient, Service } from 'src/app/shared/interfaces'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  isNew = true
  form: FormGroup
  order: Order

  patients$: Observable<Patient[]>
  doctors$: Observable<Doctor[]>
  services$: Observable<Service[]>

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private router: Router,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
    private servicesService: ServicesService,
  ) {}

  ngOnInit(): void {
    this.patients$ = this.patientsService.fetch()
    this.doctors$ = this.doctorsService.fetch()
    this.services$ = this.servicesService.fetch()

    this.form = new FormGroup({
      dateOfOrder: new FormControl(null, Validators.required),
      patient: new FormControl(null, Validators.required),
      doctor: new FormControl(null, Validators.required),
      service: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.orderService.getById(params['id'])
          }
          return of(null)
        }),
      )
      .subscribe(
        (order) => {
          if (order) {
            this.order = order
            this.form.patchValue({
              dateOfOrder: order.dateOfOrder,
              patient: order.patient,
              doctor: order.doctor,
              service: order.service,
              cost: order.cost,
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        (error) => MaterialService.toast(error.error.message),
      )
  }

  deleteOrder() {
    const decision = window.confirm(
      `Чи бажаєте ви видалити цей запис? "${this.order._id}"`,
    )
    if (decision) {
      this.orderService.delete(this.order._id).subscribe(
        (response) => MaterialService.toast(response.message),
        (error) => MaterialService.toast(error.error.Message),
        () => this.router.navigate(['/order']),
      )
    }
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.orderService.create(this.form.value)
    } else {
      obs$ = this.orderService.update(this.order._id, this.form.value)
    }

    obs$.subscribe(
      (order) => {
        this.order = order
        alert('Запис додано!')
        this.form.enable()
      },
      (error) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      },
    )
  }
}
