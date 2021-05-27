import { OrdersService } from './../shared/services/orders.service'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Order } from '../shared/interfaces'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  orders$: Observable<Order[]>

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersService.fetch()
  }
}
