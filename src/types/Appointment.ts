export interface AppointmentRequest {
    clientName: string
    email: string
    phone: string
    preferredDate: string
    preferredTime: string
    serviceIds: number[]   // ← reemplaza cutId: number
    message?: string
  }