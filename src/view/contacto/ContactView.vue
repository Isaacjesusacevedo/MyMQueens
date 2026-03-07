<template>
  <section class="contact">

    <div class="contact__header">
      <span class="contact__eyebrow">Encontranos</span>
      <h1 class="contact__title">Contacto</h1>
      <p class="contact__subtitle">
        Estamos en el centro de Buenos Aires. Reservá online o escribinos directamente.
      </p>
    </div>

    <!-- Grid principal -->
    <div class="contact__grid">

      <!-- ── Ubicación ── -->
      <article class="contact-card">
        <div class="contact-card__icon">📍</div>
        <div class="contact-card__body">
          <h2 class="contact-card__title">Dirección</h2>
          <p class="contact-card__value">Av. de Mayo 782<br/>Ciudad Autónoma de Buenos Aires</p>
          <a
            href="https://maps.google.com/?q=Av.+de+Mayo+782,+Buenos+Aires"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-card__link"
          >
            Ver en Google Maps
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </article>

      <!-- ── WhatsApp ── -->
      <article class="contact-card contact-card--accent">
        <div class="contact-card__icon">💬</div>
        <div class="contact-card__body">
          <h2 class="contact-card__title">WhatsApp</h2>
          <p class="contact-card__value">(54) 11 6407-1011</p>
          <a
            href="https://wa.me/5491164071011"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-card__link contact-card__link--primary"
          >
            Abrir WhatsApp →
          </a>
        </div>
      </article>

      <!-- ── Instagram ── -->
      <article class="contact-card">
        <div class="contact-card__icon">📸</div>
        <div class="contact-card__body">
          <h2 class="contact-card__title">Instagram</h2>
          <p class="contact-card__value">@mym_queens_</p>
          <a
            href="https://instagram.com/mym_queens_"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-card__link"
          >
            Ver perfil
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </article>

    </div>

    <!-- Banner de horarios -->
    <div class="hours-banner">
      <div class="hours-banner__inner">
        <div class="hours-banner__icon">🕘</div>
        <div class="hours-banner__content">
          <span class="hours-banner__label">Horario de atención</span>
          <span class="hours-banner__value">Lunes a Viernes · 09:00 – 19:00 hs</span>
        </div>
        <div class="hours-banner__sep" aria-hidden="true" />
        <RouterLink to="/horarios" class="hours-banner__link">Ver horarios completos</RouterLink>
      </div>
    </div>

    <!-- CTA -->
    <div class="contact__cta">
      <p class="contact__cta-title">¿Querés reservar un turno?</p>
      <RouterLink to="/" class="contact__cta-btn">
        Reservar online
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </RouterLink>
    </div>

  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.contact {
  max-width: 760px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  min-height: 100vh;
}

/* Header */
.contact__header { text-align: center; margin-bottom: 3rem; }
.contact__eyebrow {
  display: inline-block;
  font-family: var(--font-caps);
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.7rem;
  opacity: 0.8;
}
.contact__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.7rem;
  letter-spacing: -0.01em;
}
.contact__subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 400px;
  margin: 0 auto;
}

/* Grid */
.contact__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.75rem;
}

/* Cards */
.contact-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-soft);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.contact-card:hover {
  border-color: var(--border);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.contact-card--accent {
  border-color: rgba(201,168,76,0.22);
  background: var(--bg-raised);
}
.contact-card--accent:hover { border-color: var(--accent); box-shadow: 0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.08); }

.contact-card__icon { font-size: 1.6rem; line-height: 1; }
.contact-card__body { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
.contact-card__title {
  font-family: var(--font-caps);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
}
.contact-card__value {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.45;
  margin: 0;
}
.contact-card__link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: auto;
  padding-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;
  border-top: 1px solid var(--border-soft);
  width: 100%;
}
.contact-card__link:hover { color: var(--accent); }

.contact-card__link--primary {
  background: var(--accent);
  color: #0D0720;
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.2rem;
  width: auto;
  font-weight: 600;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(201,168,76,0.25);
  transition: background 0.18s, transform 0.15s;
}
.contact-card__link--primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  color: #0D0720;
}

/* Hours banner */
.hours-banner {
  background: var(--bg-surface);
  border: 1px solid var(--border-soft);
  border-radius: 14px;
  padding: 1.1rem 1.5rem;
  margin-bottom: 2.5rem;
}
.hours-banner__inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.hours-banner__icon { font-size: 1.1rem; flex-shrink: 0; }
.hours-banner__content { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 160px; }
.hours-banner__label { font-family: var(--font-caps); font-size: 0.55rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }
.hours-banner__value { font-size: 0.9rem; color: var(--text-primary); font-weight: 500; }
.hours-banner__sep { width: 1px; height: 28px; background: var(--border-soft); flex-shrink: 0; }
.hours-banner__link {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(201,168,76,0.3);
  padding-bottom: 1px;
  transition: border-color 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.hours-banner__link:hover { border-color: var(--accent); }

/* CTA */
.contact__cta {
  text-align: center;
  padding: 2.5rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 18px;
}
.contact__cta-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}
.contact__cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #0D0720;
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.78rem 2rem;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
  box-shadow: 0 4px 18px rgba(201,168,76,0.25);
}
.contact__cta-btn:hover { background: var(--accent-hover); transform: translateY(-2px); }

/* Responsive */
@media (max-width: 560px) {
  .contact { padding: 2.5rem 1rem 4rem; }
  .contact__grid { grid-template-columns: 1fr; }
  .hours-banner__sep { display: none; }
}
</style>