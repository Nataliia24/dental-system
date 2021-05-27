import { Message, Service } from './../interfaces'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Service[]> {
    return this.http.get<Service[]>('/api/service')
  }

  getById(id: string): Observable<Service> {
    return this.http.get<Service>(`/api/service/${id}`)
  }

  create(service: Service): Observable<Service> {
    return this.http.post<Service>('/api/service', service)
  }

  update(id: string, service: Service): Observable<Service> {
    return this.http.patch<Service>(`/api/service/${id}`, service)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/service/${id}`)
  }
}
