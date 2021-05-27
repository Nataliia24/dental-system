export interface User {
  email: string
  password: string
}

export interface Message {
  message: string
}

export interface Service {
  name: string
  price: number
  user?: string
  _id?: string
}

export interface Doctor {
  first_name: string
  last_name: string
  email: string
  telNumber: string
  position: string
  user?: string
  _id?: string
}

export interface Patient {
  first_name: string
  last_name: string
  email: string
  country: string
  city: string
  address: string
  dateOfBirth: Date
  telNumber: string
  user?: string
  doctor?: Doctor
  _id?: string
}

export interface Country {
  name: string
}

export interface City {
  name: string
}

export interface Order {
  dateOfOrder?: Date
  order?: number
  patient: string
  doctor: string
  service: string
  cost: number
  user?: string
  _id: string
}

export interface OverviewPage {
  orders: OverviewPageItem
  gain: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number
  compare: number
  yesterday: number
  isHier: number
}

export interface AnalyticsPage {
  average: number
  chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
  gain: number
  order: number
  label: string
}
