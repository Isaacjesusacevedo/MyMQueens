<template>
    <div class="home">
  
      <!-- ══ HERO ══════════════════════════════════════════════════════ -->
      <section class="hero">
        <div class="hero__content">
          <span class="hero__eyebrow">Peluquería & Estética</span>
          <h1 class="hero__title">Tu mejor versión<br/><em>empieza acá</em></h1>
          <p class="hero__subtitle">
            Elegí los servicios que querés, reservá en segundos y dejá el resto en nuestras manos.
          </p>
          <a class="hero__cta" href="#servicios" @click.prevent="scrollTo('servicios')">
            Ver servicios
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
            </svg>
          </a>
        </div>
        <div class="hero__decoration" aria-hidden="true">
          <div class="deco-ring deco-ring--lg" />
          <div class="deco-ring deco-ring--sm" />
          <span class="deco-scissors">✂</span>
        </div>
      </section>
  
      <!-- ══ SERVICIOS ═════════════════════════════════════════════════ -->
      <section class="services" id="servicios">
        <div class="services__header">
          <span class="section-eyebrow">¿Qué necesitás hoy?</span>
          <h2 class="section-title">Elegí uno o más servicios</h2>
          <p class="section-subtitle">
            Tocá las tarjetas para seleccionarlas. Podés combinar varios en una misma visita.
          </p>
        </div>
  
        <!-- Filtros -->
        <div class="services__filters" role="tablist">
          <button
            class="filter-btn"
            :class="{ 'filter-btn--active': store.activeCategory === 'all' }"
            @click="store.setCategory('all')"
          >Todos</button>
          <button
            v-for="g in store.serviceGroups"
            :key="g.category"
            class="filter-btn"
            :class="{ 'filter-btn--active': store.activeCategory === g.category }"
            @click="store.setCategory(g.category)"
          >
            {{ g.icon }} {{ g.label }}
          </button>
        </div>
  
        <!-- Grupos de servicios -->
        <div class="services__groups">
          <div
            v-for="group in store.filteredGroups"
            :key="group.category"
            class="service-group"
          >
            <div class="service-group__header">
              <span class="group-icon">{{ group.icon }}</span>
              <h3 class="group-title">{{ group.label }}</h3>
              <span class="group-count">{{ group.services.length }}</span>
            </div>
            <div class="service-group__grid">
              <ServiceCard
                v-for="svc in group.services"
                :key="svc.id"
                :service="svc"
              />
            </div>
          </div>
        </div>
      </section>
  
      <!-- ══ FORMULARIO ════════════════════════════════════════════════ -->
      <div class="booking-wrapper">
        <BookingForm />
      </div>
  
      <!-- ══ BARRA FLOTANTE DE SELECCIÓN ═══════════════════════════════ -->
      <Transition name="bar-slide">
        <div v-if="store.hasSelection" class="selection-bar" role="status" aria-live="polite">
          <div class="selection-bar__left">
            <span class="selection-bar__count">{{ store.selectedIds.size }}</span>
            <span class="selection-bar__text">
              {{ store.selectedIds.size === 1 ? 'servicio seleccionado' : 'servicios seleccionados' }}
            </span>
            <span class="selection-bar__total">${{ store.totalPrice.toLocaleString('es-AR') }}</span>
          </div>
          <div class="selection-bar__actions">
            <button class="bar-btn bar-btn--ghost" @click="store.clearSelection">Limpiar</button>
            <button class="bar-btn bar-btn--primary" @click="scrollTo('booking-form')">
              Reservar turno →
            </button>
          </div>
        </div>
      </Transition>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { useServicesStore } from '@/stores/servicesStore'
  import ServiceCard from '@/components/services/ServiceCard.vue'
  import BookingForm from '@/components/booking/BookingForm.vue'
  
  const store = useServicesStore()
  
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  </script>
  
  <style scoped>
  /* ── Reset + fuentes globales ─────────────────────────────── */
  :root {
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body:    'DM Sans', sans-serif;
    --bg:                 #faf9f7;
    --card-bg:            #ffffff;
    --card-bg-popular:    #fffbf2;
    --border:             #e8e4de;
    --accent:             #c4973a;
    --accent-light:       #f5e9cf;
    --text-primary:       #1a1714;
    --text-secondary:     #5c5550;
    --text-muted:         #9e9790;
  }
  
  .home {
    background: var(--bg);
    font-family: var(--font-body);
    min-height: 100vh;
  }
  
  /* ══ HERO ═══════════════════════════════════════════════════════════ */
  .hero {
    position: relative;
    overflow: hidden;
    background: var(--text-primary);
    padding: 6rem 2rem 5rem;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2rem;
    max-width: 100%;
  }
  
  .hero__content { max-width: 560px; position: relative; z-index: 2; }
  
  .hero__eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  
  .hero__title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1.12;
    margin: 0 0 1.25rem;
  }
  .hero__title em {
    font-style: italic;
    color: var(--accent);
  }
  
  .hero__subtitle {
    font-size: 1rem;
    color: #a09990;
    line-height: 1.65;
    margin-bottom: 2rem;
    max-width: 420px;
  }
  
  .hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent);
    color: #fff;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.95rem;
    padding: 0.75rem 1.75rem;
    border-radius: 999px;
    text-decoration: none;
    transition: background 0.18s, transform 0.15s;
  }
  .hero__cta:hover { background: #b5862e; transform: translateY(-2px); }
  
  /* Decoración geométrica */
  .hero__decoration {
    position: relative;
    width: 220px;
    height: 220px;
    flex-shrink: 0;
    display: none;
  }
  @media (min-width: 700px) { .hero__decoration { display: block; } }
  
  .deco-ring {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(196, 151, 58, 0.25);
  }
  .deco-ring--lg { inset: 0; }
  .deco-ring--sm { inset: 30px; border-color: rgba(196, 151, 58, 0.4); }
  .deco-scissors {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    opacity: 0.15;
    color: var(--accent);
    transform: rotate(-30deg);
  }
  
  /* ══ SERVICIOS ══════════════════════════════════════════════════════ */
  .services {
    max-width: 1120px;
    margin: 0 auto;
    padding: 5rem 1.5rem 2rem;
  }
  
  .services__header { text-align: center; margin-bottom: 2.5rem; }
  
  .section-eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.6rem;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.75rem;
  }
  .section-subtitle {
    font-size: 0.95rem;
    color: var(--text-secondary);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Filtros */
  .services__filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 3.5rem;
  }
  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 0.45rem 1.1rem;
    border: 1.5px solid var(--border);
    border-radius: 999px;
    background: transparent;
    font-family: var(--font-body);
    font-size: 0.84rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
  }
  .filter-btn:hover { border-color: var(--accent); color: var(--accent); }
  .filter-btn--active { background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 600; }
  
  /* Grupos */
  .services__groups { display: flex; flex-direction: column; gap: 3.5rem; }
  
  .service-group__header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.2rem;
    padding-bottom: 0.7rem;
    border-bottom: 2px solid var(--border);
  }
  .group-icon  { font-size: 1.4rem; }
  .group-title { font-family: var(--font-display); font-size: 1.45rem; font-weight: 700; color: var(--text-primary); flex: 1; margin: 0; }
  .group-count {
    font-size: 0.75rem;
    color: var(--text-muted);
    background: var(--border);
    padding: 2px 9px;
    border-radius: 20px;
  }
  
  .service-group__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.15rem;
  }
  
  /* ══ BOOKING WRAPPER ════════════════════════════════════════════════ */
  .booking-wrapper {
    background: var(--bg);
    border-top: 2px solid var(--border);
    margin-top: 4rem;
  }
  
  /* ══ BARRA FLOTANTE ═════════════════════════════════════════════════ */
  .selection-bar {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--text-primary);
    border-radius: 999px;
    padding: 0.75rem 0.9rem 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 100;
    white-space: nowrap;
    max-width: calc(100vw - 2rem);
  }
  
  .selection-bar__left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #f5f0e8;
  }
  .selection-bar__count {
    background: var(--accent);
    color: #fff;
    font-weight: 700;
    font-size: 0.9rem;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .selection-bar__text  { font-size: 0.875rem; color: #bfb8b0; }
  .selection-bar__total { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--accent); margin-left: 0.25rem; }
  
  .selection-bar__actions { display: flex; gap: 0.5rem; }
  
  .bar-btn {
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.5rem 1.1rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: all 0.18s;
  }
  .bar-btn--ghost { background: rgba(255,255,255,0.1); color: #bfb8b0; }
  .bar-btn--ghost:hover { background: rgba(255,255,255,0.18); color: #fff; }
  .bar-btn--primary { background: var(--accent); color: #fff; }
  .bar-btn--primary:hover { background: #b5862e; }
  
  /* Transición barra */
  .bar-slide-enter-active, .bar-slide-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .bar-slide-enter-from, .bar-slide-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(20px) scale(0.95);
  }
  
  /* ── Responsive ─────────────────────────────────────────────── */
  @media (max-width: 600px) {
    .hero { padding: 4rem 1.25rem 3.5rem; grid-template-columns: 1fr; }
    .services { padding: 3rem 1rem 2rem; }
    .service-group__grid { grid-template-columns: 1fr; }
    .selection-bar { flex-direction: column; border-radius: 20px; text-align: center; padding: 1rem 1.25rem; gap: 0.75rem; }
    .selection-bar__left { justify-content: center; }
    .selection-bar__actions { width: 100%; justify-content: center; }
    .bar-btn--primary { flex: 1; }
  }
  </style>