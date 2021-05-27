import { DoctorsService } from './../../shared/services/doctors.service'
import { Doctor } from './../../shared/interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { MaterialService } from 'src/app/shared/classes/material.service'
import { of } from 'rxjs'

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css'],
})
export class DoctorFormComponent implements OnInit {
  isNew = true
  form: FormGroup
  doctor: Doctor

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      telNumber: new FormControl(null, Validators.required),
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.doctorService.getById(params['id'])
          }
          return of(null)
        }),
      )
      .subscribe(
        (doctor) => {
          if (doctor) {
            this.doctor = doctor
            this.form.patchValue({
              first_name: doctor.first_name,
              last_name: doctor.last_name,
              email: doctor.email,
              position: doctor.position,
              telNumber: doctor.telNumber,
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        (error) => MaterialService.toast(error.error.message),
      )
  }

  deleteDoctor() {
    const decision = window.confirm(
      `Чи бажаєте Ви видалити лікаря "${this.doctor.first_name}"`,
    )
    if (decision) {
      this.doctorService.delete(this.doctor._id).subscribe(
        (response) => MaterialService.toast(response.message),
        (error) => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/doctor']),
      )
    }
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.doctorService.create(this.form.value)
    } else {
      obs$ = this.doctorService.update(this.doctor._id, this.form.value)
    }

    obs$.subscribe(
      (doctor) => {
        this.doctor = doctor
        MaterialService.toast('Зміни збережено')
        this.form.enable()
      },
      (error) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      },
    )
  }
}
