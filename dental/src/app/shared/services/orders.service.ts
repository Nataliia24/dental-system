import { Message, Order } from '../interfaces'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order')
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`/api/order/${id}`)
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  update(id: string, order: Order): Observable<Order> {
    return this.http.patch<Order>(`/api/order/${id}`, order)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/order/${id}`)
  }
}
