<template>
  <div class="app">

    <!-- ══ NAVBAR ══════════════════════════════════════════════════════ -->
    <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
      <nav class="navbar__inner">

        <!-- Logo / Brand -->
        <RouterLink to="/" class="navbar__brand" aria-label="MyM Queens — Inicio">
          <span class="brand__crown">♛</span>
          <span class="brand__name">
            <span class="brand__mym">MyM</span>
            <span class="brand__queens">Queens</span>
          </span>
        </RouterLink>

        <!-- Links desktop -->
        <ul class="navbar__links" role="list">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="nav-link"
              :class="{ 'nav-link--active': route.name === link.name }"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- CTA derecho -->
        <RouterLink to="/" class="navbar__cta" @click.prevent="scrollToBooking">
          Reservar turno
        </RouterLink>

        <!-- Toggle mobile -->
        <button
          class="navbar__toggle"
          :class="{ 'navbar__toggle--open': mobileOpen }"
          @click="mobileOpen = !mobileOpen"
          :aria-expanded="mobileOpen"
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </nav>

      <!-- Menú mobile -->
      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="navbar__mobile" @click="mobileOpen = false">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-link"
            :class="{ 'mobile-link--active': route.name === link.name }"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink to="/" class="mobile-cta" @click.prevent="scrollToBooking">
            Reservar turno →
          </RouterLink>
        </div>
      </Transition>
    </header>

    <!-- ══ CONTENIDO PRINCIPAL ══════════════════════════════════════ -->
    <main class="app__main">
      <RouterView v-slot="{ Component, route: r }">
        <Transition :name="transitionName" mode="out-in">
          <component :is="Component" :key="r.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <!-- ══ FOOTER ═══════════════════════════════════════════════════ -->
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <span class="footer__crown">♛</span>
          <span class="footer__name">MyM Queens</span>
        </div>
        <div class="footer__line" />
        <p class="footer__address">Av. de Mayo 782 · CABA · Argentina</p>
        <p class="footer__social">@mym_queens_</p>
        <div class="footer__line" />
        <p class="footer__copy">© {{ new Date().getFullYear() }} MyM Queens · Todos los derechos reservados</p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route      = useRoute()
const scrolled   = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { to: '/',          name: 'home',     label: 'Inicio'    },
  { to: '/servicios', name: 'services', label: 'Servicios' },
  { to: '/horarios',  name: 'schedule', label: 'Horarios'  },
  { to: '/contacto',  name: 'contact',  label: 'Contacto'  },
]

const transitionName = computed(() => 'page')

function onScroll() {
  scrolled.value = window.scrollY > 24
  if (mobileOpen.value) mobileOpen.value = false
}

function scrollToBooking() {
  mobileOpen.value = false
  if (route.name !== 'home') {
    // navegar a home y luego hacer scroll
    window.location.href = '/'
    return
  }
  document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
/* ════════════════════════════════════════════════════════════════════
   VARIABLES GLOBALES — MyM Queens Design System
   Se declaran en :root sin scoped para que todos los componentes las usen.
════════════════════════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  color-scheme: dark;

  --font-display: 'Playfair Display', Georgia, serif;
  --font-caps:    'Cinzel', Georgia, serif;
  --font-body:    'DM Sans', sans-serif;

  /* Paleta */
  --bg:                #0D0720;
  --bg-surface:        #1A0D2E;
  --bg-raised:         #2E1255;
  --bg-overlay:        #3D1A6E;
  --border:            rgba(201, 168, 76, 0.22);
  --border-soft:       rgba(201, 168, 76, 0.09);
  --border-strong:     rgba(201, 168, 76, 0.45);
  --accent:            #C9A84C;
  --accent-hover:      #A8861E;
  --accent-dim:        rgba(201, 168, 76, 0.12);
  --accent-glow:       rgba(201, 168, 76, 0.20);
  --text-primary:      #F5F0E8;
  --text-secondary:    rgba(245, 240, 232, 0.55);
  --text-muted:        rgba(245, 240, 232, 0.28);
  --success:           #2d9e6b;
  --error:             #e05757;

  /* Sombras */
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.35);
  --shadow-md:  0 8px 28px rgba(0,0,0,0.50);
  --shadow-lg:  0 20px 60px rgba(0,0,0,0.65);
  --shadow-glow: 0 0 40px rgba(201,168,76,0.15), 0 0 80px rgba(201,168,76,0.06);

  /* Espaciado */
  --nav-h: 62px;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Patrón de fondo arabesco muy sutil */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.3' opacity='0.035'%3E%3Ccircle cx='50' cy='50' r='35'/%3E%3Ccircle cx='50' cy='50' r='20'/%3E%3Cpath d='M50 15 L50 85 M15 50 L85 50'/%3E%3Cpath d='M26 26 L74 74 M74 26 L26 74'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 100px 100px;
  pointer-events: none;
  z-index: 0;
}

#app, .app {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
  padding-top: var(--nav-h);
}
</style>

<style scoped>
/* ════════════════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════════════ */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-h);
  z-index: 200;
  background: rgba(13, 7, 32, 0.75);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-soft);
  transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}
.navbar--scrolled {
  background: rgba(13, 7, 32, 0.95);
  border-bottom-color: var(--border);
  box-shadow: 0 4px 32px rgba(0,0,0,0.45);
}

.navbar__inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

/* Brand */
.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
  transition: opacity 0.18s;
}
.navbar__brand:hover { opacity: 0.85; }

.brand__crown {
  font-size: 1.25rem;
  color: var(--accent);
  line-height: 1;
  text-shadow: 0 0 12px rgba(201,168,76,0.5);
}

.brand__name {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.brand__mym {
  font-family: var(--font-caps);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--text-primary);
  text-transform: uppercase;
}
.brand__queens {
  font-family: var(--font-caps);
  font-size: 0.58rem;
  font-weight: 400;
  letter-spacing: 0.32em;
  color: var(--accent);
  text-transform: uppercase;
  margin-top: 1px;
}

/* Links */
.navbar__links {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  flex: 1;
}

.nav-link {
  display: inline-block;
  padding: 0.4rem 0.85rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.18s, background 0.18s;
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px; left: 0.85rem; right: 0.85rem;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s var(--easing-out, cubic-bezier(0.16,1,0.3,1));
}
.nav-link:hover { color: var(--text-primary); }
.nav-link:hover::after,
.nav-link--active::after { transform: scaleX(1); }
.nav-link--active { color: var(--text-primary); }

/* CTA */
.navbar__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 1.2rem;
  background: var(--accent);
  color: #0D0720;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  border-radius: 999px;
  text-decoration: none;
  flex-shrink: 0;
  transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
  box-shadow: 0 2px 12px rgba(201,168,76,0.25);
}
.navbar__cta:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(201,168,76,0.35);
}

/* Toggle mobile */
.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
}
.navbar__toggle span {
  display: block;
  width: 22px; height: 1.5px;
  background: var(--text-secondary);
  transition: all 0.25s ease;
  transform-origin: center;
}
.navbar__toggle--open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); background: var(--accent); }
.navbar__toggle--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.navbar__toggle--open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); background: var(--accent); }

/* Mobile menu */
.navbar__mobile {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1.5rem 1.5rem;
  border-top: 1px solid var(--border-soft);
  background: rgba(13,7,32,0.98);
  gap: 0.25rem;
}
.mobile-link {
  padding: 0.7rem 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-bottom: 1px solid var(--border-soft);
  transition: color 0.15s;
}
.mobile-link:last-of-type { border-bottom: none; }
.mobile-link:hover, .mobile-link--active { color: var(--text-primary); }
.mobile-cta {
  display: inline-flex;
  align-self: flex-start;
  margin-top: 0.75rem;
  padding: 0.6rem 1.4rem;
  background: var(--accent);
  color: #0D0720;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 999px;
  text-decoration: none;
}

/* Transiciones menú mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active { transition: all 0.28s ease; overflow: hidden; }
.mobile-menu-enter-from,
.mobile-menu-leave-to { opacity: 0; transform: translateY(-10px); }

/* ════════════════════════════════════════════════════════════════════
   PAGE TRANSITION
════════════════════════════════════════════════════════════════════ */
.page-enter-active {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
}
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ════════════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════════════ */
.footer {
  border-top: 1px solid var(--border-soft);
  padding: 3rem 2rem;
  background: var(--bg-surface);
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.footer__crown {
  font-size: 1.1rem;
  color: var(--accent);
  text-shadow: 0 0 10px rgba(201,168,76,0.4);
}
.footer__name {
  font-family: var(--font-caps);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--text-primary);
  text-transform: uppercase;
}

.footer__line {
  width: 1px; height: 28px;
  background: linear-gradient(to bottom, transparent, var(--border), transparent);
}

.footer__address,
.footer__social {
  font-size: 0.8rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}
.footer__social {
  font-family: var(--font-caps);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  opacity: 0.7;
}
.footer__copy {
  font-size: 0.72rem;
  color: var(--text-muted);
  opacity: 0.6;
}

/* ── Responsive navbar ─────────────────────────────────────── */
@media (max-width: 768px) {
  .navbar__links,
  .navbar__cta { display: none; }
  .navbar__toggle { display: flex; }
  .navbar__inner { gap: 1rem; }
}
</style>