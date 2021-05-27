import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Calendar, CalendarOptions } from '@fullcalendar/angular'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Observable, pipe } from 'rxjs'
import { map } from 'rxjs/operators'
import { Order } from '../shared/interfaces'
import { OrdersService } from '../shared/services/orders.service'

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  orders$: Observable<Order[]>
  order: Order[] = []

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Демків Володимир', date: '2021-05-12' },
      { title: 'Остапенко Іван', date: '2021-05-12' },
      { title: 'Верховинська Ірина', date: '2021-05-13' },
      { title: 'Демків Володимир', date: '2021-05-14' },
      { title: 'Верховинська Ірина', date: '2021-05-17' },
    ],
  }

  constructor(private ordersService: OrdersService, private http: HttpClient) {
    const name = Calendar.name
  }

  ngOnInit(): void {
    this.orders$ = this.ordersService.fetch()
  }
}
