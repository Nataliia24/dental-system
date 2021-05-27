import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Doctor, Message } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('/api/doctor')
  }

  getById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`/api/doctor/${id}`)
  }

  create(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>('/api/doctor', doctor)
  }

  update(id: string, doctor: Doctor): Observable<Doctor> {
    return this.http.patch<Doctor>(`/api/doctor/${id}`, doctor)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/doctor/${id}`)
  }
}
