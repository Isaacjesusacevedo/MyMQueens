<template>
  <section class="booking" id="booking-form">

    <div class="booking__inner">
      <!-- Header -->
      <div class="booking__header">
        <span class="booking__eyebrow">Reservá tu turno</span>
        <h2 class="booking__title">¿Cuándo venís?</h2>
        <p class="booking__subtitle">
          Completá el formulario y te contactamos por WhatsApp para confirmar la cita.
        </p>
      </div>

      <!-- Resumen de selección -->
      <Transition name="summary-slide">
        <div v-if="store.hasSelection" class="summary">
          <div class="summary__head">
            <span class="summary__label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
              Servicios seleccionados
            </span>
            <button class="summary__clear" @click="store.clearSelection">Limpiar todo</button>
          </div>

          <div class="summary__chips">
            <span v-for="svc in store.selectedServices" :key="svc.id" class="chip">
              {{ svc.name }}
              <button class="chip__x" @click="store.toggleService(svc.id)" :aria-label="`Quitar ${svc.name}`">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/>
                </svg>
              </button>
            </span>
          </div>

          <div class="summary__totals">
            <div class="summary__stat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{{ formatDuration(store.totalDuration) }}</span>
            </div>
            <div class="summary__sep" aria-hidden="true" />
            <div class="summary__stat summary__stat--price">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
              <strong>${{ store.totalPrice.toLocaleString('es-AR') }}</strong>
              <span class="stat-note">estimado</span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Hint sin selección -->
      <div v-if="!store.hasSelection" class="booking__hint">
        <div class="hint__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
          </svg>
        </div>
        <p>Seleccioná uno o más servicios de la lista de arriba para incluirlos en tu reserva.</p>
      </div>

      <!-- Formulario -->
      <form class="form" novalidate @submit.prevent="handleSubmit">

        <!-- Paso 1: datos personales -->
        <fieldset class="form__group">
          <legend class="form__legend">
            <span class="legend__num">01</span>
            Tus datos de contacto
          </legend>
          <div class="form__row">
            <div class="field">
              <label for="clientName" class="field__label">Nombre completo</label>
              <input
                id="clientName"
                v-model="form.clientName"
                type="text"
                class="field__input"
                :class="{ 'field__input--error': errors.clientName }"
                placeholder="Ej: Laura García"
                autocomplete="name"
              />
              <span v-if="errors.clientName" class="field__error">{{ errors.clientName }}</span>
            </div>
            <div class="field">
              <label for="phone" class="field__label">Teléfono / WhatsApp</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="field__input"
                :class="{ 'field__input--error': errors.phone }"
                placeholder="Ej: 11 4567-8900"
                autocomplete="tel"
              />
              <span v-if="errors.phone" class="field__error">{{ errors.phone }}</span>
            </div>
          </div>
          <div class="field">
            <label for="email" class="field__label">Correo electrónico</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="field__input"
              :class="{ 'field__input--error': errors.email }"
              placeholder="tu@correo.com"
              autocomplete="email"
            />
            <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
          </div>
        </fieldset>

        <!-- Paso 2: fecha y horario -->
        <fieldset class="form__group">
          <legend class="form__legend">
            <span class="legend__num">02</span>
            Fecha y horario preferidos
          </legend>
          <div class="form__row">
            <div class="field">
              <label for="preferredDate" class="field__label">Fecha</label>
              <input
                id="preferredDate"
                v-model="form.preferredDate"
                type="date"
                class="field__input"
                :class="{ 'field__input--error': errors.preferredDate }"
                :min="minDate"
              />
              <span v-if="errors.preferredDate" class="field__error">{{ errors.preferredDate }}</span>
            </div>
            <div class="field">
              <label for="preferredTime" class="field__label">Horario</label>
              <select
                id="preferredTime"
                v-model="form.preferredTime"
                class="field__input field__select"
                :class="{ 'field__input--error': errors.preferredTime }"
              >
                <option value="" disabled>Elegí un horario</option>
                <optgroup label="Mañana">
                  <option v-for="slot in morningSlots" :key="slot" :value="slot">{{ slot }}</option>
                </optgroup>
                <optgroup label="Tarde">
                  <option v-for="slot in afternoonSlots" :key="slot" :value="slot">{{ slot }}</option>
                </optgroup>
              </select>
              <span v-if="errors.preferredTime" class="field__error">{{ errors.preferredTime }}</span>
            </div>
          </div>
        </fieldset>

        <!-- Paso 3: mensaje opcional -->
        <fieldset class="form__group">
          <legend class="form__legend">
            <span class="legend__num">03</span>
            Información adicional <span class="legend__opt">(opcional)</span>
          </legend>
          <div class="field">
            <textarea
              id="message"
              v-model="form.message"
              class="field__input field__textarea"
              rows="3"
              placeholder="Largo del cabello, estilo que buscás, preferencias especiales..."
            />
          </div>
        </fieldset>

        <!-- Acciones -->
        <div class="form__actions">
          <p v-if="errors.services" class="field__error">{{ errors.services }}</p>
          <button
            type="submit"
            class="btn-submit"
            :disabled="submitting"
          >
            <span v-if="!submitting">
              Solicitar turno
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </span>
            <span v-else class="spinner" />
          </button>
          <p class="form__disclaimer">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Tu solicitud queda pendiente hasta que te confirmemos disponibilidad.
          </p>
        </div>

      </form>

      <!-- Estado de éxito -->
      <Transition name="fade">
        <div v-if="submitted" class="success">
          <div class="success__check">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3 class="success__title">¡Solicitud enviada!</h3>
          <p class="success__body">
            Te vamos a escribir por WhatsApp o correo a
            <strong>{{ form.email }}</strong>
            para confirmar el turno.
          </p>
          <button class="success__reset" @click="resetForm">Hacer otra reserva</button>
        </div>
      </Transition>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useServicesStore } from '@/stores/servicesStore'
import type { AppointmentRequest } from '@/types/Appointment'

const store = useServicesStore()

const minDate = computed(() => new Date().toISOString().split('T')[0])

const morningSlots   = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30']
const afternoonSlots = ['14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30']

const form = reactive({ clientName: '', email: '', phone: '', preferredDate: '', preferredTime: '', message: '' })
const errors    = reactive<Record<string, string>>({})
const submitting = ref(false)
const submitted  = ref(false)

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.clientName.trim())                                  errors.clientName    = 'El nombre es obligatorio.'
  if (!form.phone.trim())                                       errors.phone         = 'El teléfono es obligatorio.'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Ingresá un correo válido.'
  if (!form.preferredDate)                                      errors.preferredDate = 'Elegí una fecha.'
  if (!form.preferredTime)                                      errors.preferredTime = 'Elegí un horario.'
  if (!store.hasSelection)                                      errors.services      = 'Seleccioná al menos un servicio antes de enviar.'
  return Object.keys(errors).length === 0
}

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || ''

async function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  const payload: AppointmentRequest = { ...form, serviceIds: Array.from(store.selectedIds) }
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    submitted.value = true
    store.clearSelection()
  } catch (err) {
    console.error('Error al enviar:', err)
    errors.services = 'Hubo un error. Por favor intentá de nuevo.'
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  Object.assign(form, { clientName: '', email: '', phone: '', preferredDate: '', preferredTime: '', message: '' })
  submitted.value = false
}

function formatDuration(m: number): string {
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60), r = m % 60
  return r === 0 ? `${h} h` : `${h} h ${r} min`
}
</script>

<style scoped>
/* ── Sección wrapper ── */
.booking {
  background: var(--bg-surface);
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
}

.booking__inner {
  max-width: 680px;
  margin: 0 auto;
  padding: 5rem 2rem 6rem;
  scroll-margin-top: 80px;
}

/* ── Header ── */
.booking__eyebrow {
  display: inline-block;
  font-family: var(--font-caps);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.65rem;
  opacity: 0.8;
}
.booking__title {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.6rem;
  letter-spacing: -0.01em;
}
.booking__subtitle {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 2.5rem;
  max-width: 480px;
}

/* ── Summary ── */
.summary {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.25rem 1.4rem;
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
}
.summary::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px; height: 100%;
  background: linear-gradient(to bottom, var(--accent), transparent);
  border-radius: 14px 0 0 14px;
}

.summary__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.9rem;
}
.summary__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-caps);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}
.summary__clear {
  background: none;
  border: none;
  font-size: 0.77rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 5px;
  transition: color 0.15s, background 0.15s;
}
.summary__clear:hover { color: var(--text-primary); background: var(--border-soft); }

.summary__chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  color: #0D0720;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 8px 4px 12px;
  border-radius: 999px;
}
.chip__x {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px; height: 18px;
  background: rgba(13,7,32,0.2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  color: #0D0720;
  transition: background 0.15s;
  flex-shrink: 0;
}
.chip__x:hover { background: rgba(13,7,32,0.38); }

.summary__totals { display: flex; align-items: center; gap: 1rem; padding-top: 0.85rem; border-top: 1px solid var(--border-soft); flex-wrap: wrap; }
.summary__stat { display: flex; align-items: center; gap: 0.4rem; font-size: 0.83rem; color: var(--text-secondary); }
.summary__stat--price strong { color: var(--accent); font-size: 1rem; font-family: var(--font-display); }
.summary__stat--price .stat-note { font-size: 0.72rem; color: var(--text-muted); }
.summary__sep { width: 1px; height: 18px; background: var(--border-soft); }

/* ── Hint ── */
.booking__hint {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  background: var(--bg);
  border: 1px solid var(--border-soft);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  margin-bottom: 2.5rem;
}
.hint__icon {
  width: 32px; height: 32px;
  background: var(--accent-dim);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}
.booking__hint p { font-size: 0.855rem; color: var(--text-secondary); line-height: 1.55; margin: 0; padding-top: 6px; }

/* ── Formulario ── */
.form { display: flex; flex-direction: column; gap: 2rem; }

.form__group {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form__legend {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-caps);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  width: 100%;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border-soft);
}
.legend__num {
  font-size: 0.65rem;
  color: var(--accent);
  background: var(--accent-dim);
  padding: 1px 7px;
  border-radius: 4px;
}
.legend__opt { font-weight: 400; opacity: 0.6; text-transform: none; letter-spacing: 0; }

.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }

/* Fields */
.field { display: flex; flex-direction: column; gap: 0.38rem; }
.field__label {
  font-family: var(--font-caps);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.field__input {
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--text-primary);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 0.68rem 0.9rem;
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;
  width: 100%;
  line-height: 1.4;
}
.field__input::placeholder { color: var(--text-muted); }
.field__input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(201,168,76,0.14);
}
.field__input--error { border-color: var(--error) !important; }

.field__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.9rem center;
  padding-right: 2.5rem;
  cursor: pointer;
}
/* Dark optgroup styling */
option, optgroup { background: #1A0D2E; color: var(--text-primary); }
optgroup { font-family: var(--font-caps); font-size: 0.6rem; letter-spacing: 0.08em; color: var(--text-muted); }

.field__textarea { resize: vertical; min-height: 82px; }

.field__error { font-size: 0.76rem; color: var(--error); margin-top: -1px; }

/* Actions */
.form__actions { display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; padding-top: 0.5rem; }

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #0D0720;
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.8rem 2.2rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
  min-width: 190px;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(201,168,76,0.25);
}
.btn-submit:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.35); }
.btn-submit:disabled { opacity: 0.65; cursor: not-allowed; }

.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(13,7,32,0.25);
  border-top-color: #0D0720;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

.form__disclaimer {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.73rem;
  color: var(--text-muted);
  line-height: 1.4;
  text-align: right;
}

/* ── Éxito ── */
.success {
  text-align: center;
  padding: 3.5rem 2rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 18px;
  margin-top: 1rem;
}
.success__check {
  width: 62px; height: 62px;
  background: var(--success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.4rem;
  box-shadow: 0 4px 24px rgba(45,158,107,0.35);
}
.success__title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.6rem;
}
.success__body {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1.75rem;
}
.success__body strong { color: var(--accent); }
.success__reset {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.85rem;
  padding: 0.62rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s;
}
.success__reset:hover { border-color: var(--accent); color: var(--accent); }

/* Transitions */
.summary-slide-enter-active, .summary-slide-leave-active { transition: all 0.32s ease; overflow: hidden; }
.summary-slide-enter-from, .summary-slide-leave-to { opacity: 0; transform: translateY(-8px); max-height: 0; }
.summary-slide-enter-to, .summary-slide-leave-from { opacity: 1; max-height: 400px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 560px) {
  .booking__inner { padding: 3.5rem 1.25rem 4rem; }
  .form__row { grid-template-columns: 1fr; }
  .form__actions { align-items: stretch; }
  .btn-submit { width: 100%; }
}
</style>