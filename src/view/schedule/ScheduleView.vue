<template>
  <section class="schedule-view">

    <!-- Header -->
    <div class="schedule-view__header">
      <span class="schedule-view__eyebrow">Horarios de atención</span>
      <h1 class="schedule-view__title">¿Cuándo podés venir?</h1>
      <p class="schedule-view__subtitle">
        Atendemos de lunes a viernes. Reservá tu turno online y confirmamos a la brevedad.
      </p>
    </div>

    <!-- Tarjeta principal de horarios -->
    <div class="schedule-card">
      <div class="schedule-card__header">
        <span class="schedule-card__icon">🗓</span>
        <span class="schedule-card__label">Horario semanal</span>
      </div>

      <div class="schedule-table">
        <div
          v-for="day in schedule"
          :key="day.name"
          class="schedule-row"
          :class="{ 'schedule-row--closed': !day.open, 'schedule-row--today': day.isToday }"
        >
          <span class="schedule-row__day">
            <span v-if="day.isToday" class="today-dot" aria-label="Hoy" />
            {{ day.name }}
          </span>
          <span class="schedule-row__hours">
            <template v-if="day.open">
              <span class="hours-badge">{{ day.from }} – {{ day.to }}</span>
            </template>
            <template v-else>
              <span class="closed-badge">Cerrado</span>
            </template>
          </span>
        </div>
      </div>
    </div>

    <!-- Franjas horarias -->
    <div class="slots-section">
      <h2 class="slots-section__title">Franjas disponibles</h2>
      <div class="slots-grid">
        <div class="slot-card">
          <div class="slot-card__time">09:00 – 13:00</div>
          <div class="slot-card__label">Mañana</div>
          <p class="slot-card__desc">Ideal para servicios rápidos: corte, barba, diseño de cejas.</p>
        </div>
        <div class="slot-card slot-card--accent">
          <div class="slot-card__time">14:00 – 19:00</div>
          <div class="slot-card__label">Tarde</div>
          <p class="slot-card__desc">Para nail art, combos y servicios que requieren más tiempo.</p>
        </div>
      </div>
    </div>

    <!-- Notas importantes -->
    <div class="notes-section">
      <h2 class="notes-section__title">A tener en cuenta</h2>
      <ul class="notes-list">
        <li class="note-item">
          <span class="note-icon">⏱</span>
          <p><strong>Reserva con anticipación.</strong> Los turnos de nail art (kapping, soft gel, combos) requieren al menos 24 horas de anticipación.</p>
        </li>
        <li class="note-item">
          <span class="note-icon">📲</span>
          <p><strong>Confirmación manual.</strong> Una vez enviada tu solicitud, te contactamos por WhatsApp para confirmar disponibilidad.</p>
        </li>
        <li class="note-item">
          <span class="note-icon">🚫</span>
          <p><strong>Cancelaciones.</strong> Si no podés venir, avisanos con al menos 2 horas de anticipación para liberar el turno a otro cliente.</p>
        </li>
        <li class="note-item">
          <span class="note-icon">📅</span>
          <p><strong>Feriados.</strong> Los feriados nacionales y provinciales el local puede estar cerrado. Consultá disponibilidad por WhatsApp antes de reservar.</p>
        </li>
      </ul>
    </div>

    <!-- CTA -->
    <div class="schedule-cta">
      <p class="schedule-cta__text">¿Listo para reservar?</p>
      <RouterLink to="/" class="schedule-cta__btn">
        Ir al formulario de reserva →
      </RouterLink>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const DAYS = [
  { name: 'Lunes',     open: true,  from: '09:00', to: '19:00' },
  { name: 'Martes',    open: true,  from: '09:00', to: '19:00' },
  { name: 'Miércoles', open: true,  from: '09:00', to: '19:00' },
  { name: 'Jueves',    open: true,  from: '09:00', to: '19:00' },
  { name: 'Viernes',   open: true,  from: '09:00', to: '19:00' },
  { name: 'Sábado',    open: false, from: '',      to: ''       },
  { name: 'Domingo',   open: false, from: '',      to: ''       },
]

// 0 = domingo, 1 = lunes, ..., 6 = sábado
const todayIndex = new Date().getDay()
// mapeamos al índice de nuestro arreglo (lunes=0 ... domingo=6)
const mappedToday = todayIndex === 0 ? 6 : todayIndex - 1

const schedule = computed(() =>
  DAYS.map((d, i) => ({ ...d, isToday: i === mappedToday }))
)
</script>

<style scoped>
:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-caps:    'Cinzel', Georgia, serif;
  --font-body:    'DM Sans', sans-serif;
  --bg:                #0D0720;
  --card-bg:           #1A0D2E;
  --card-bg-popular:   #2E1255;
  --border:            rgba(201, 168, 76, 0.25);
  --border-soft:       rgba(201, 168, 76, 0.10);
  --accent:            #C9A84C;
  --accent-hover:      #A8861E;
  --text-primary:      #F5F0E8;
  --text-secondary:    rgba(245, 240, 232, 0.55);
  --text-muted:        rgba(245, 240, 232, 0.30);
}

.schedule-view {
  min-height: 100vh;
  background: var(--bg);
  font-family: var(--font-body);
  padding: 4rem 1.5rem 6rem;
  max-width: 720px;
  margin: 0 auto;
}

/* ── Header ── */
.schedule-view__header { text-align: center; margin-bottom: 3rem; }

.schedule-view__eyebrow {
  display: inline-block;
  font-family: var(--font-caps);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
  opacity: 0.85;
}

.schedule-view__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
}

.schedule-view__subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ── Tarjeta de horarios ── */
.schedule-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.schedule-card__header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.5rem;
  background: rgba(201,168,76,0.06);
  border-bottom: 1px solid var(--border-soft);
}

.schedule-card__icon { font-size: 1.1rem; }

.schedule-card__label {
  font-family: var(--font-caps);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.85;
}

/* Tabla de días */
.schedule-table {
  display: flex;
  flex-direction: column;
}

.schedule-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  border-bottom: 1px solid var(--border-soft);
  transition: background 0.15s;
}
.schedule-row:last-child { border-bottom: none; }
.schedule-row--closed { opacity: 0.45; }
.schedule-row--today { background: rgba(201,168,76,0.06); }

.schedule-row__day {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
}

.today-dot {
  width: 7px; height: 7px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(201,168,76,0.5);
}

.hours-badge {
  font-family: var(--font-caps);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--accent);
  background: rgba(201,168,76,0.1);
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid rgba(201,168,76,0.2);
}

.closed-badge {
  font-family: var(--font-caps);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--border-soft);
}

/* ── Franjas ── */
.slots-section { margin-bottom: 3rem; }

.slots-section__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1.25rem;
}

.slots-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.slot-card {
  background: var(--card-bg);
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  padding: 1.25rem;
}
.slot-card--accent {
  border-color: var(--border);
  background: var(--card-bg-popular);
}

.slot-card__time {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 0.25rem;
}

.slot-card__label {
  font-family: var(--font-caps);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.slot-card__desc {
  font-size: 0.84rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* ── Notas ── */
.notes-section { margin-bottom: 3rem; }

.notes-section__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1.25rem;
}

.notes-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0;
}

.note-item {
  display: flex;
  gap: 0.85rem;
  background: var(--card-bg);
  border: 1px solid var(--border-soft);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  align-items: flex-start;
}

.note-icon {
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.note-item p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
}
.note-item strong { color: var(--text-primary); }

/* ── CTA ── */
.schedule-cta {
  text-align: center;
  padding: 2.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
}

.schedule-cta__text {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}

.schedule-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent);
  color: #0D0720;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.18s, transform 0.15s;
}
.schedule-cta__btn:hover { background: var(--accent-hover); transform: translateY(-2px); }

/* ── Responsive ── */
@media (max-width: 520px) {
  .slots-grid { grid-template-columns: 1fr; }
  .schedule-view { padding: 2.5rem 1rem 4rem; }
}
</style>