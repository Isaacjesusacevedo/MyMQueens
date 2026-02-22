export type ServiceCategory =
  | 'corte'
  | 'color'
  | 'tratamiento'
  | 'estetica'
  | 'combo'

export interface Service {
  id: number
  name: string
  description: string
  price: number
  durationMinutes: number
  category: ServiceCategory
  popular?: boolean
}

export interface ServiceGroup {
  category: ServiceCategory
  label: string
  icon: string
  services: Service[]
}