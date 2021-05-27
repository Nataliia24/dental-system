import { MaterialService } from './../../classes/material.service'
import { AuthService } from './../../services/auth.service'
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef: ElementRef

  links = [
    { url: '/overview', name: 'Огляд' },
    { url: '/history', name: 'Історія' },
    { url: '/patient', name: 'Пацієнти' },
    { url: '/doctor', name: 'Лікарі' },
    { url: '/order', name: 'Добавити запис' },
    { url: '/service', name: 'Послуги' },
  ]

  constructor(private auth: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
