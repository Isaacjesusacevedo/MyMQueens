import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Service, ServiceCategory, ServiceGroup } from '@/types/Service'

const ALL_SERVICES: Service[] = [
  // ── PELUQUERÍA ────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Corte Hombre',
    description: 'Corte clásico o moderno con tijera o máquina, incluye peinado final.',
    price: 15000,
    durationMinutes: 30,
    category: 'peluqueria',
    popular: true,
  },
  {
    id: 2,
    name: 'Corte + Barba',
    description: 'Corte de cabello más perfilado y arreglo completo de barba.',
    price: 20000,
    durationMinutes: 50,
    category: 'peluqueria',
    popular: true,
  },
  {
    id: 3,
    name: 'Barba',
    description: 'Perfilado, arreglo y terminación de barba. Ideal como mantenimiento.',
    price: 8000,
    durationMinutes: 15,
    category: 'peluqueria',
  },
  {
    id: 4,
    name: 'Trenzas',
    description: 'Trenzas elaboradas, box braids o trenzas simples. Precio según complejidad.',
    price: 15000,
    durationMinutes: 60,
    category: 'peluqueria',
  },
  {
    id: 5,
    name: 'Alisado',
    description: 'Alisado definitivo o semipermanente para un cabello liso y brillante.',
    price: 30000,
    durationMinutes: 120,
    category: 'peluqueria',
  },
  {
    id: 6,
    name: 'Lavado de Cabello',
    description: 'Lavado con shampoo profesional y masaje de cuero cabelludo.',
    price: 6000,
    durationMinutes: 20,
    category: 'peluqueria',
  },
  {
    id: 7,
    name: 'Extensiones',
    description: 'Colocación de extensiones naturales o sintéticas. Precio desde.',
    price: 15000,
    durationMinutes: 90,
    category: 'peluqueria',
  },

  // ── NAIL ART ──────────────────────────────────────────────────────
  {
    id: 8,
    name: 'Semi Básica',
    description: 'Manicura semipermanente en color liso. Larga duración con secado UV.',
    price: 32000,
    durationMinutes: 50,
    category: 'nail_art',
    popular: true,
  },
  {
    id: 9,
    name: 'Kapping Nivelación',
    description: 'Kapping con gel builder para nivelar la superficie y dar estructura.',
    price: 36000,
    durationMinutes: 90,
    category: 'nail_art',
  },
  {
    id: 10,
    name: 'Kapping Gel',
    description: 'Gel builder de alta duración con estructura reforzada. Incluye diseño simple.',
    price: 38000,
    durationMinutes: 90,
    category: 'nail_art',
    popular: true,
  },
  {
    id: 11,
    name: 'Soft Gel Básico',
    description: 'Extensión soft gel natural, flexible y de acabado premium.',
    price: 42000,
    durationMinutes: 90,
    category: 'nail_art',
  },
  {
    id: 12,
    name: 'Pedicura',
    description: 'Pedicura completa: limpieza, limado, cutículas y esmalte.',
    price: 27000,
    durationMinutes: 60,
    category: 'nail_art',
  },
  {
    id: 13,
    name: 'Belleza de Pies',
    description: 'Tratamiento completo de pies: exfoliación, hidratación y nail art.',
    price: 35000,
    durationMinutes: 70,
    category: 'nail_art',
  },
  {
    id: 14,
    name: 'Nail Art Diseño',
    description: 'Diseño artístico sobre cualquier servicio. Precio por adición según complejidad.',
    price: 3500,
    durationMinutes: 20,
    category: 'nail_art',
  },

  // ── ESTÉTICA ──────────────────────────────────────────────────────
  {
    id: 15,
    name: 'Diseño de Cejas',
    description: 'Diseño personalizado y depilación con hilo o cera según morfología facial.',
    price: 12000,
    durationMinutes: 20,
    category: 'estetica',
    popular: true,
  },

  // ── COMBOS ────────────────────────────────────────────────────────
  {
    id: 16,
    name: 'Combo Reina',
    description: 'Semi básica + Corte femenino. La combinación completa para lucir perfecta.',
    price: 42000,
    durationMinutes: 90,
    category: 'combo',
    popular: true,
  },
  {
    id: 17,
    name: 'Combo Novios',
    description: 'Corte + Barba (él) y Manicura semi (ella). Reserva doble con descuento.',
    price: 48000,
    durationMinutes: 100,
    category: 'combo',
  },
  {
    id: 18,
    name: 'Combo Quinceañera',
    description: 'Peinado de evento + Manicura semipermanente + Belleza de pies. Ocasión especial.',
    price: 65000,
    durationMinutes: 180,
    category: 'combo',
  },
  {
    id: 19,
    name: 'Combo Ejecutivo',
    description: 'Corte hombre + Cuidado básico de manos. Ideal para primer acercamiento al nail art.',
    price: 20000,
    durationMinutes: 50,
    category: 'combo',
  },
]

const CATEGORY_META: Record<ServiceCategory, { label: string; icon: string }> = {
  peluqueria: { label: 'Peluquería', icon: '✂️' },
  nail_art:   { label: 'Nail Art',   icon: '💅' },
  estetica:   { label: 'Estética',   icon: '✨' },
  combo:      { label: 'Combos',     icon: '🌟' },
}

export const useServicesStore = defineStore('services', () => {
  const activeCategory = ref<ServiceCategory | 'all'>('all')
  const selectedIds    = ref<Set<number>>(new Set())

  const serviceGroups = computed<ServiceGroup[]>(() => {
    const cats: ServiceCategory[] = ['peluqueria', 'nail_art', 'estetica', 'combo']
    return cats.map((cat) => ({
      category: cat,
      label:    CATEGORY_META[cat].label,
      icon:     CATEGORY_META[cat].icon,
      services: ALL_SERVICES.filter((s) => s.category === cat),
    }))
  })

  const filteredGroups = computed<ServiceGroup[]>(() => {
    if (activeCategory.value === 'all') return serviceGroups.value
    return serviceGroups.value.filter((g) => g.category === activeCategory.value)
  })

  const selectedServices = computed<Service[]>(() =>
    ALL_SERVICES.filter((s) => selectedIds.value.has(s.id))
  )

  const totalPrice    = computed(() => selectedServices.value.reduce((s, x) => s + x.price, 0))
  const totalDuration = computed(() => selectedServices.value.reduce((s, x) => s + x.durationMinutes, 0))
  const hasSelection  = computed(() => selectedIds.value.size > 0)

  function setCategory(cat: ServiceCategory | 'all') { activeCategory.value = cat }

  function toggleService(id: number) {
    const next = new Set(selectedIds.value)
    next.has(id) ? next.delete(id) : next.add(id)
    selectedIds.value = next
  }

  function isSelected(id: number): boolean { return selectedIds.value.has(id) }
  function clearSelection() { selectedIds.value = new Set() }

  return {
    activeCategory, selectedIds,
    serviceGroups, filteredGroups,
    selectedServices, totalPrice, totalDuration, hasSelection,
    setCategory, toggleService, isSelected, clearSelection,
  }
})