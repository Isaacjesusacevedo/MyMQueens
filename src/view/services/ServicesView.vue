<template>
    <section class="services-view">
      <!-- Header -->
      <div class="services-view__header">
        <span class="services-view__eyebrow">Lo que hacemos</span>
        <h1 class="services-view__title">Nuestros Servicios</h1>
        <p class="services-view__subtitle">
          Cada servicio es realizado por profesionales con productos de primera calidad.
        </p>
      </div>
  
      <!-- Filtro de categorías -->
      <div class="services-view__filters" role="tablist" aria-label="Categorías de servicios">
        <button
          role="tab"
          :aria-selected="store.activeCategory === 'all'"
          class="filter-btn"
          :class="{ 'filter-btn--active': store.activeCategory === 'all' }"
          @click="store.setCategory('all')"
        >
          Todos
        </button>
        <button
          v-for="group in store.serviceGroups"
          :key="group.category"
          role="tab"
          :aria-selected="store.activeCategory === group.category"
          class="filter-btn"
          :class="{ 'filter-btn--active': store.activeCategory === group.category }"
          @click="store.setCategory(group.category)"
        >
          <span class="filter-btn__icon">{{ group.icon }}</span>
          {{ group.label }}
        </button>
      </div>
  
      <!-- Grupos de servicios -->
      <div class="services-view__content">
        <div
          v-for="group in store.filteredGroups"
          :key="group.category"
          class="service-group"
        >
          <div class="service-group__header">
            <span class="service-group__icon">{{ group.icon }}</span>
            <h2 class="service-group__title">{{ group.label }}</h2>
            <span class="service-group__count">{{ group.services.length }} servicios</span>
          </div>
  
          <div class="service-group__grid">
            <ServiceCard
              v-for="service in group.services"
              :key="service.id"
              :service="service"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useServicesStore } from '@/stores/servicesStore'
  import ServiceCard from '@/components/services/ServiceCard.vue'
  
  const store = useServicesStore()
  </script>
  
  <style scoped>
  /* ── Variables globales (idealmente en main.css) ── */
  :root {
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
  
    --bg: #faf9f7;
    --card-bg: #ffffff;
    --card-bg-popular: #fffbf2;
    --border: #e8e4de;
    --accent: #c4973a;
    --accent-text: #ffffff;
    --text-primary: #1a1714;
    --text-secondary: #5c5550;
    --text-muted: #9e9790;
  }
  
  /* ── Layout principal ── */
  .services-view {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font-body);
    padding: 4rem 1.5rem 6rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  
  /* ── Header ── */
  .services-view__header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .services-view__eyebrow {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }
  
  .services-view__title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 1rem;
    line-height: 1.15;
  }
  
  .services-view__subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* ── Filtros ── */
  .services-view__filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 3.5rem;
  }
  
  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.5rem 1.25rem;
    border: 1.5px solid var(--border);
    border-radius: 999px;
    background: transparent;
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
  }
  
  .filter-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  
  .filter-btn--active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    font-weight: 600;
  }
  
  .filter-btn__icon {
    font-size: 1rem;
    line-height: 1;
  }
  
  /* ── Grupos ── */
  .services-view__content {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
  }
  
  .service-group__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--border);
  }
  
  .service-group__icon {
    font-size: 1.5rem;
    line-height: 1;
  }
  
  .service-group__title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
    flex: 1;
  }
  
  .service-group__count {
    font-size: 0.8rem;
    color: var(--text-muted);
    background: var(--border);
    padding: 3px 10px;
    border-radius: 20px;
  }
  
  .service-group__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.25rem;
  }
  
  /* ── Responsive ── */
  @media (max-width: 600px) {
    .services-view {
      padding: 2.5rem 1rem 4rem;
    }
    .service-group__grid {
      grid-template-columns: 1fr;
    }
  }
  </style>