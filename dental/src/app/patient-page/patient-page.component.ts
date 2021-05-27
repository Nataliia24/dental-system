import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Patient } from '../shared/interfaces'
import { PatientsService } from '../shared/services/patients.service'

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css'],
})
export class PatientPageComponent implements OnInit {
  patients$: Observable<Patient[]>

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patients$ = this.patientsService.fetch()
  }
}
