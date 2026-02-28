<template>
  <section class="booking" id="booking-form" ref="sectionRef">
    <!-- Encabezado -->
    <div class="booking__header">
      <span class="booking__eyebrow">Reservá tu turno</span>
      <h2 class="booking__title">¿Cuándo venís?</h2>
      <p class="booking__subtitle">
        Completá el formulario y nos comunicamos para confirmar tu cita.
      </p>
    </div>

    <!-- Resumen de servicios seleccionados -->
    <Transition name="summary-slide">
      <div v-if="store.hasSelection" class="booking__summary">
        <div class="summary__header">
          <span class="summary__label">Servicios seleccionados</span>
          <button class="summary__clear" @click="store.clearSelection" aria-label="Limpiar selección">
            Limpiar
          </button>
        </div>

        <div class="summary__chips">
          <span
            v-for="svc in store.selectedServices"
            :key="svc.id"
            class="summary__chip"
          >
            {{ svc.name }}
            <button
              class="chip__remove"
              @click="store.toggleService(svc.id)"
              :aria-label="`Quitar ${svc.name}`"
            >×</button>
          </span>
        </div>

        <div class="summary__totals">
          <div class="summary__total-item">
            <span class="summary__total-label">⏱ Duración estimada</span>
            <strong>{{ formatDuration(store.totalDuration) }}</strong>
          </div>
          <div class="summary__divider" />
          <div class="summary__total-item">
            <span class="summary__total-label">💰 Total estimado</span>
            <strong class="summary__price">${{ store.totalPrice.toLocaleString('es-AR') }}</strong>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Aviso sin selección -->
    <div v-if="!store.hasSelection" class="booking__hint">
      <span>👆</span>
      <p>Seleccioná uno o más servicios de la lista para incluirlos en tu reserva.</p>
    </div>

    <!-- Formulario -->
    <form class="booking__form" novalidate @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-field">
          <label for="clientName">Nombre completo</label>
          <input
            id="clientName"
            v-model="form.clientName"
            type="text"
            placeholder="Ej: Laura García"
            :class="{ 'input--error': errors.clientName }"
            autocomplete="name"
          />
          <span v-if="errors.clientName" class="field-error">{{ errors.clientName }}</span>
        </div>

        <div class="form-field">
          <label for="phone">Teléfono</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="Ej: 11 4567-8900"
            :class="{ 'input--error': errors.phone }"
            autocomplete="tel"
          />
          <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
        </div>
      </div>

      <div class="form-field">
        <label for="email">Correo electrónico</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="tu@correo.com"
          :class="{ 'input--error': errors.email }"
          autocomplete="email"
        />
        <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label for="preferredDate">Fecha preferida</label>
          <input
            id="preferredDate"
            v-model="form.preferredDate"
            type="date"
            :min="minDate"
            :class="{ 'input--error': errors.preferredDate }"
          />
          <span v-if="errors.preferredDate" class="field-error">{{ errors.preferredDate }}</span>
        </div>

        <div class="form-field">
          <label for="preferredTime">Horario preferido</label>
          <select
            id="preferredTime"
            v-model="form.preferredTime"
            :class="{ 'input--error': errors.preferredTime }"
          >
            <option value="" disabled>Elegí un horario</option>
            <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
          </select>
          <span v-if="errors.preferredTime" class="field-error">{{ errors.preferredTime }}</span>
        </div>
      </div>

      <div class="form-field">
        <label for="message">Mensaje adicional <span class="label-optional">(opcional)</span></label>
        <textarea
          id="message"
          v-model="form.message"
          rows="3"
          placeholder="Contanos algo más: largo del cabello, producto que usás, preferencias..."
        />
      </div>

      <!-- Submit -->
      <div class="form-actions">
        <p v-if="errors.services" class="field-error">{{ errors.services }}</p>
        <button
          type="submit"
          class="btn-submit"
          :class="{ 'btn-submit--loading': submitting }"
          :disabled="submitting"
        >
          <span v-if="!submitting">Solicitar turno</span>
          <span v-else class="spinner" />
        </button>
      </div>
    </form>

    <!-- Feedback éxito -->
    <Transition name="fade">
      <div v-if="submitted" class="booking__success">
        <div class="success__icon">✓</div>
        <h3>¡Solicitud enviada!</h3>
        <p>Te contactaremos pronto para confirmar tu turno.<br/>Revisá tu correo <strong>{{ form.email }}</strong>.</p>
        <button class="btn-reset" @click="resetForm">Hacer otra reserva</button>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useServicesStore } from '@/stores/servicesStore'
import type { AppointmentRequest } from '@/types/Appointment'

const store = useServicesStore()

// ── Fecha mínima = hoy ─────────────────────────────────────────────
const minDate = computed(() => new Date().toISOString().split('T')[0])

// ── Horarios disponibles ───────────────────────────────────────────
const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]

// ── Estado del formulario ──────────────────────────────────────────
const form = reactive({
  clientName: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const submitted  = ref(false)

// ── Validación ─────────────────────────────────────────────────────
function validate(): boolean {
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!form.clientName.trim())
    errors.clientName = 'El nombre es obligatorio.'
  if (!form.phone.trim())
    errors.phone = 'El teléfono es obligatorio.'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Ingresá un correo válido.'
  if (!form.preferredDate)
    errors.preferredDate = 'Elegí una fecha.'
  if (!form.preferredTime)
    errors.preferredTime = 'Elegí un horario.'
  if (!store.hasSelection)
    errors.services = 'Seleccioná al menos un servicio antes de enviar.'

  return Object.keys(errors).length === 0
}

// ── URL del Web App de Google Apps Script ─────────────────────────
// Reemplazá este valor con tu URL de deployment después de publicar el script
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || ''

// ── Envío ──────────────────────────────────────────────────────────
async function handleSubmit() {
  if (!validate()) return

  submitting.value = true

  const payload: AppointmentRequest = {
    ...form,
    serviceIds: Array.from(store.selectedIds),
  }

  try {
    // Google Apps Script no soporta CORS en modo fetch directo,
    // usamos no-cors. La respuesta será opaca pero el dato llega igual.
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    submitted.value = true
    store.clearSelection()
  } catch (err) {
    console.error('Error al enviar el turno:', err)
    errors.services = 'Hubo un error al enviar. Por favor intentá de nuevo.'
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  Object.assign(form, {
    clientName: '', email: '', phone: '',
    preferredDate: '', preferredTime: '', message: '',
  })
  submitted.value = false
}

// ── Helpers ────────────────────────────────────────────────────────
function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}
</script>

<style scoped>
.booking {
  scroll-margin-top: 5rem;
  padding: 5rem 1.5rem 6rem;
  max-width: 720px;
  margin: 0 auto;
}

/* ── Header ── */
.booking__eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.6rem;
}
.booking__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
}
.booking__subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

/* ── Summary ── */
.booking__summary {
  background: var(--card-bg-popular);
  border: 1.5px solid var(--accent);
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
}
.summary__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
}
.summary__label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
.summary__clear {
  background: none;
  border: none;
  font-size: 0.8rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}
.summary__clear:hover { color: var(--text-primary); background: var(--border); }

.summary__chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.summary__chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--accent);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 4px 10px 4px 12px;
  border-radius: 999px;
}
.chip__remove {
  background: rgba(255,255,255,0.25);
  border: none;
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background 0.15s;
}
.chip__remove:hover { background: rgba(255,255,255,0.45); }

.summary__totals {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}
.summary__total-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary); }
.summary__total-item strong { color: var(--text-primary); }
.summary__price { color: var(--accent) !important; font-size: 1.1rem; }
.summary__divider { width: 1px; height: 20px; background: var(--border); }

/* ── Hint ── */
.booking__hint {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: var(--border);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ── Form ── */
.booking__form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }

.form-field { display: flex; flex-direction: column; gap: 0.4rem; }

label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.03em;
}
.label-optional { font-weight: 400; color: var(--text-muted); }

input, select, textarea {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-primary);
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;
  width: 100%;
}
input:focus, select:focus, textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 15%, transparent);
}
.input--error { border-color: #e05757; }
textarea { resize: vertical; min-height: 80px; }
select { cursor: pointer; }

.field-error {
  font-size: 0.78rem;
  color: #e05757;
  margin-top: -2px;
}

/* ── Actions ── */
.form-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; padding-top: 0.5rem; }

.btn-submit {
  background: var(--accent);
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.75rem 2.5rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s, opacity 0.18s;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-submit:hover:not(:disabled) { background: #b5862e; transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner {
  width: 18px; height: 18px;
  border: 2.5px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Success ── */
.booking__success {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-bg);
  border: 1.5px solid var(--accent);
  border-radius: 16px;
  margin-top: 2rem;
}
.success__icon {
  width: 60px; height: 60px;
  background: var(--accent);
  color: #fff;
  font-size: 1.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}
.booking__success h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.booking__success p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.btn-reset {
  background: none;
  border: 1.5px solid var(--accent);
  color: var(--accent);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s;
}
.btn-reset:hover { background: var(--accent); color: #fff; }

/* ── Transitions ── */
.summary-slide-enter-active, .summary-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.summary-slide-enter-from, .summary-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
}
.summary-slide-enter-to, .summary-slide-leave-from {
  opacity: 1;
  max-height: 400px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 560px) {
  .form-row { grid-template-columns: 1fr; }
  .form-actions { align-items: stretch; }
  .btn-submit { width: 100%; }
}
</style>