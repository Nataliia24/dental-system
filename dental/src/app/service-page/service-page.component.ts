import { Observable } from 'rxjs'
import { ServicesService } from './../shared/services/services.service'
import { Component, OnInit } from '@angular/core'
import { Service } from '../shared/interfaces'

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.css'],
})
export class ServicePageComponent implements OnInit {
  services$: Observable<Service[]>

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.services$ = this.servicesService.fetch()
  }
}
