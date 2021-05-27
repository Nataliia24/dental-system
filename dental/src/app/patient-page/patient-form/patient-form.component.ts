import { PatientsService } from './../../shared/services/patients.service'
import { Patient } from './../../shared/interfaces'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { MaterialService } from 'src/app/shared/classes/material.service'

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  isNew = true
  form: FormGroup
  patient: Patient

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      last_name: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      telNumber: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.patientService.getById(params['id'])
          }
          return of(null)
        }),
      )
      .subscribe(
        (patient) => {
          if (patient) {
            this.patient = patient
            this.form.patchValue({
              last_name: patient.last_name,
              first_name: patient.first_name,
              email: patient.email,
              telNumber: patient.telNumber,
              dateOfBirth: patient.dateOfBirth,
              country: patient.country,
              city: patient.city,
              address: patient.address,
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        (error) => MaterialService.toast(error.error.message),
      )
  }

  deletePatient() {
    const decision = window.confirm(
      `Чи бажаєте Ви видалити пацієнта "${this.patient.first_name}"`,
    )
    if (decision) {
      this.patientService.delete(this.patient._id).subscribe(
        (response) => alert(response.message),
        (error) => MaterialService.toast(error.error.message),
        () => this.router.navigate(['/patient']),
      )
    }
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.patientService.create(this.form.value)
    } else {
      obs$ = this.patientService.update(this.patient._id, this.form.value)
    }

    obs$.subscribe(
      (patient) => {
        this.patient = patient
        alert('Зміни збережено')
        this.form.enable()
      },
      (error) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      },
    )
  }
}
