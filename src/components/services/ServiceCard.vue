<template>
  <article
    class="card"
    :class="{
      'card--popular':  service.popular && !isSelected,
      'card--selected': isSelected,
    }"
    role="checkbox"
    :aria-checked="isSelected"
    tabindex="0"
    @click="handleSelect"
    @keydown.enter.space.prevent="handleSelect"
  >
    <!-- Badge top -->
    <div v-if="isSelected" class="card__badge card__badge--selected">
      <svg width="10" height="8" viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 5 4.5 9 11 1"/>
      </svg>
      Seleccionado
    </div>
    <div v-else-if="service.popular" class="card__badge card__badge--popular">
      Popular
    </div>

    <!-- Checkbox indicator -->
    <div class="card__check" :class="{ 'card__check--on': isSelected }">
      <svg viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 5 4.5 9 11 1"/>
      </svg>
    </div>

    <!-- Body -->
    <div class="card__body">
      <h3 class="card__name">{{ service.name }}</h3>
      <p class="card__desc">{{ service.description }}</p>
    </div>

    <!-- Footer -->
    <div class="card__footer">
      <span class="card__duration">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        {{ service.durationMinutes }} min
      </span>
      <span class="card__price">${{ service.price.toLocaleString('es-AR') }}</span>
    </div>

    <!-- Glow de fondo al estar seleccionado -->
    <div v-if="isSelected" class="card__glow" aria-hidden="true" />
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useServicesStore } from '@/stores/servicesStore'
import type { Service } from '@/types/Service'

const props  = defineProps<{ service: Service }>()
const store  = useServicesStore()
const isSelected = computed(() => store.isSelected(props.service.id))

function handleSelect() {
  const wasSelected = isSelected.value
  store.toggleService(props.service.id)
  if (!wasSelected) {
    setTimeout(() => {
      document.getElementById('booking-form')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 140)
  }
}
</script>

<style scoped>
@keyframes cardIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border-soft);
  border-radius: 14px;
  padding: 2.4rem 1.35rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition:
    transform 0.22s cubic-bezier(0.16,1,0.3,1),
    box-shadow 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease;
  animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
  animation-delay: var(--card-delay, 0ms);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.45), 0 0 0 1px var(--border);
  border-color: var(--border);
}

.card:focus-visible {
  box-shadow: 0 0 0 3px rgba(201,168,76,0.35);
  border-color: var(--accent);
}

/* Estado popular (sin seleccionar) */
.card--popular {
  border-color: rgba(201,168,76,0.18);
  background: linear-gradient(145deg, var(--bg-surface) 0%, rgba(46,18,85,0.6) 100%);
}

/* Estado seleccionado */
.card--selected {
  border-color: var(--accent) !important;
  background: var(--bg-raised);
  box-shadow:
    0 4px 28px rgba(0,0,0,0.4),
    0 0 0 1px rgba(201,168,76,0.30),
    inset 0 0 0 1px rgba(201,168,76,0.08);
}
.card--selected:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 40px rgba(0,0,0,0.5),
    0 0 0 1px var(--accent),
    0 0 30px rgba(201,168,76,0.12);
}

/* Glow interno al seleccionar */
.card__glow {
  position: absolute;
  overflow: hidden;
  top: -40px; right: -40px;
  width: 160px; height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%);
  pointer-events: none;
}

/* Badge */
.card__badge {
  position: absolute;
  top: 10px; right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-caps);
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
  line-height: 1.4;
}
.card__badge--popular  { background: var(--accent); color: #0D0720; }
.card__badge--selected {
  background: var(--success);
  color: #fff;
  box-shadow: 0 2px 10px rgba(45,158,107,0.35);
}

/* Checkmark */
.card__check {
  position: absolute;
  top: 13px; left: 13px;
  width: 22px; height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
.card__check svg { width: 12px; height: 10px; stroke: transparent; transition: stroke 0.15s; }
.card__check--on {
  background: var(--success);
  border-color: var(--success);
  box-shadow: 0 0 10px rgba(45,158,107,0.4);
}
.card__check--on svg { stroke: #fff; }

/* Body */
.card__body { flex: 1; padding-left: 1.7rem; }
.card__name {
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.35rem;
  letter-spacing: -0.005em;
}
.card__desc {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Footer */
.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-soft);
}
.card__duration {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.card__price {
  font-family: var(--font-display);
  font-size: 1.18rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.01em;
}
</style>