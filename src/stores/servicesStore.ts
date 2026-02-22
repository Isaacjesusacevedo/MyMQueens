import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Service, ServiceCategory, ServiceGroup } from '@/types/Service'

const ALL_SERVICES: Service[] = [
  // CORTES
  { id: 1,  name: 'Corte Clásico',           description: 'Corte tradicional con tijera o máquina, incluye peinado final.',       price: 2500,  durationMinutes: 30,  category: 'corte',       popular: true  },
  { id: 2,  name: 'Corte + Barba',            description: 'Corte de cabello más perfilado y arreglo de barba completo.',          price: 3800,  durationMinutes: 50,  category: 'corte',       popular: true  },
  { id: 3,  name: 'Corte Infantil',           description: 'Corte especial para niños hasta 12 años.',                             price: 1800,  durationMinutes: 25,  category: 'corte'                     },
  { id: 4,  name: 'Degradado / Fade',         description: 'Degradado a máquina con detalle en la nuca y laterales.',             price: 3000,  durationMinutes: 40,  category: 'corte'                     },
  // COLOR
  { id: 5,  name: 'Tintura Completa',         description: 'Coloración completa del cabello con productos profesionales.',        price: 5500,  durationMinutes: 90,  category: 'color',       popular: true  },
  { id: 6,  name: 'Mechas / Balayage',        description: 'Técnica de aclarado con efecto natural degradado.',                  price: 7000,  durationMinutes: 120, category: 'color'                     },
  { id: 7,  name: 'Retoque de Raíz',          description: 'Aplicación de color solo en la zona de la raíz.',                    price: 3500,  durationMinutes: 60,  category: 'color'                     },
  { id: 8,  name: 'Decoloración',             description: 'Aclarado completo o parcial según el resultado deseado.',            price: 6000,  durationMinutes: 100, category: 'color'                     },
  // TRATAMIENTOS
  { id: 9,  name: 'Alisado Definitivo',       description: 'Keratina o alisado brasileño de larga duración.',                   price: 9000,  durationMinutes: 180, category: 'tratamiento', popular: true  },
  { id: 10, name: 'Hidratación Profunda',     description: 'Tratamiento nutritivo con mascarilla y vapor de ozono.',             price: 3500,  durationMinutes: 45,  category: 'tratamiento'               },
  { id: 11, name: 'Botox Capilar',            description: 'Tratamiento reconstructor que elimina frizz y aporta brillo.',      price: 7500,  durationMinutes: 120, category: 'tratamiento'               },
  // ESTETICA
  { id: 12, name: 'Manicura Clásica',         description: 'Limado, cutículas y esmalte tradicional.',                          price: 2000,  durationMinutes: 40,  category: 'estetica'                  },
  { id: 13, name: 'Manicura Semipermanente',  description: 'Esmalte de larga duración con secado en lámpara UV.',               price: 3200,  durationMinutes: 50,  category: 'estetica',    popular: true  },
  { id: 14, name: 'Depilación de Cejas',      description: 'Diseño y depilación con hilo o cera.',                             price: 1200,  durationMinutes: 20,  category: 'estetica'                  },
  // COMBOS
  { id: 15, name: 'Combo Full Day',           description: 'Corte + tintura + hidratación + manicura. El paquete completo.',    price: 13000, durationMinutes: 240, category: 'combo',       popular: true  },
  { id: 16, name: 'Combo Color & Care',       description: 'Tintura completa + hidratación profunda.',                          price: 8000,  durationMinutes: 150, category: 'combo'                     },
]

const CATEGORY_META: Record<ServiceCategory, { label: string; icon: string }> = {
  corte:       { label: 'Cortes',       icon: '✂️' },
  color:       { label: 'Color',        icon: '🎨' },
  tratamiento: { label: 'Tratamientos', icon: '✨' },
  estetica:    { label: 'Estética',     icon: '💅' },
  combo:       { label: 'Combos',       icon: '🌟' },
}

export const useServicesStore = defineStore('services', () => {
  const activeCategory = ref<ServiceCategory | 'all'>('all')
  const selectedIds = ref<Set<number>>(new Set())

  const serviceGroups = computed<ServiceGroup[]>(() => {
    const cats: ServiceCategory[] = ['corte', 'color', 'tratamiento', 'estetica', 'combo']
    return cats.map((cat) => ({
      category: cat,
      label: CATEGORY_META[cat].label,
      icon: CATEGORY_META[cat].icon,
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