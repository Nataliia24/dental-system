import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Message, Patient } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Patient[]> {
    return this.http.get<Patient[]>('/api/patient')
  }

  getById(id: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`/api/patient/${id}`)
  }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>('/api/patient', patient)
  }

  update(id: string, patient: Patient): Observable<Patient> {
    return this.http.patch<Patient>(`/api/patient/${id}`, patient)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/patient/${id}`)
  }
}
