<template>
    <article
      class="service-card"
      :class="{
        'service-card--popular':  service.popular,
        'service-card--selected': isSelected,
      }"
      role="checkbox"
      :aria-checked="isSelected"
      tabindex="0"
      @click="handleSelect"
      @keydown.enter.space.prevent="handleSelect"
    >
      <div v-if="isSelected" class="service-card__badge service-card__badge--selected">✓ Seleccionado</div>
      <div v-else-if="service.popular" class="service-card__badge">Popular</div>
  
      <div class="service-card__check" :class="{ 'service-card__check--on': isSelected }">
        <svg viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1 5 4.5 9 11 1"/>
        </svg>
      </div>
  
      <div class="service-card__body">
        <h3 class="service-card__name">{{ service.name }}</h3>
        <p class="service-card__description">{{ service.description }}</p>
      </div>
  
      <div class="service-card__footer">
        <span class="service-card__duration">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {{ service.durationMinutes }} min
        </span>
        <span class="service-card__price">${{ service.price.toLocaleString('es-AR') }}</span>
      </div>
    </article>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useServicesStore } from '@/stores/servicesStore'
  import type { Service } from '@/types/Service'
  
  const props = defineProps<{ service: Service }>()
  const store = useServicesStore()
  const isSelected = computed(() => store.isSelected(props.service.id))
  
  function handleSelect() {
    store.toggleService(props.service.id)
    if (!isSelected.value) {
      setTimeout(() => {
        document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    }
  }
  </script>
  
  <style scoped>
  .service-card {
    position: relative;
    background: var(--card-bg);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
    user-select: none;
    outline: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }
  .service-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,.1); border-color: var(--accent); }
  .service-card:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent); }
  .service-card--selected { border-color: var(--accent) !important; background: var(--card-bg-popular); box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 18%, transparent); }
  
  .service-card__badge { position: absolute; top: -11px; right: 14px; font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; background: var(--accent); color: #fff; }
  .service-card__badge--selected { background: #2d9e6b; }
  
  .service-card__check { position: absolute; top: 14px; left: 14px; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--border); background: var(--card-bg); display: flex; align-items: center; justify-content: center; transition: all .2s ease; }
  .service-card__check svg { width: 12px; height: 10px; stroke: transparent; transition: stroke .15s; }
  .service-card__check--on { background: #2d9e6b; border-color: #2d9e6b; }
  .service-card__check--on svg { stroke: #fff; }
  
  .service-card__body { flex: 1; padding-left: 1.75rem; }
  .service-card__name { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; color: var(--text-primary); margin: 0 0 .35rem; }
  .service-card__description { font-size: .84rem; color: var(--text-secondary); line-height: 1.5; margin: 0; }
  
  .service-card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: .75rem; border-top: 1px solid var(--border); }
  .service-card__duration { display: flex; align-items: center; gap: 5px; font-size: .78rem; color: var(--text-muted); }
  .service-card__price { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--accent); }
  </style>