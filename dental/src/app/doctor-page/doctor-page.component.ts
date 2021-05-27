import { DoctorsService } from './../shared/services/doctors.service'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Doctor } from '../shared/interfaces'

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.css'],
})
export class DoctorPageComponent implements OnInit {
  doctors$: Observable<Doctor[]>

  constructor(private doctorsService: DoctorsService) {}

  ngOnInit(): void {
    this.doctors$ = this.doctorsService.fetch()
  }
}
