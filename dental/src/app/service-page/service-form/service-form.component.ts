import { Service } from './../../shared/interfaces'
import { MaterialService } from './../../shared/classes/material.service'
import { ServicesService } from './../../shared/services/services.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  isNew = true
  form: FormGroup
  service: Service

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.servicesService.getById(params['id'])
          }
          return of(null)
        }),
      )
      .subscribe(
        (service) => {
          if (service) {
            this.service = service
            this.form.patchValue({
              name: service.name,
              price: service.price,
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        (error) => MaterialService.toast(error.error.message),
      )
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.servicesService.create(this.form.value)
    } else {
      obs$ = this.servicesService.update(this.service._id, this.form.value)
    }

    obs$.subscribe(
      (service) => {
        this.service = service
        MaterialService.toast('Зміни збережено')
        this.form.enable()
      },
      (error) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      },
    )
  }

  deleteService() {
    const decision = window.confirm(
      `Чи бажаєте Ви видалити послугу "${this.service.name}"`,
    )
    if (decision) {
      this.servicesService.delete(this.service._id).subscribe(
        (response) => MaterialService.toast(response.message),
        (error) => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/service']),
      )
    }
  }
}
