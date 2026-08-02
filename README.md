# MyMQueens

**Aplicación web para reserva de turnos en peluquería y nail art.**

Desarrollada con Vue 3 + Vite + TypeScript. Permite a los clientes explorar servicios, seleccionar combinaciones y gestionar reservas de forma intuitiva.

## 🌐 Demo en vivo

👉 **[Ver aplicación](https://isaacjesusacevedo.github.io/MyMQueens/)**

---

## ✨ Funcionalidades

- **Catálogo de servicios** — Peluquería (corte, barba, trenzas, alisado) y nail art (manicura, pedicura, kapping, soft gel, nail art)
- **Combos y paquetes** — Combinaciones con descuento (Combo Reina, Novios, Quinceañera, Ejecutivo)
- **Selección múltiple** — El usuario puede elegir uno o más servicios para su reserva
- **Diseño responsive** — Adaptada a mobile, tablet y desktop
- **Interfaz moderna** — UI limpia con Vue 3 Composition API

---

## 🛠️ Tecnologías

- **Vue 3** — Framework frontend con Composition API
- **Vite** — Build tool rápido para desarrollo y producción
- **TypeScript** — Tipado estático para código robusto
- **HTML5 / CSS3** — Estructura semántica y estilos personalizados

---

## 📂 Estructura del proyecto
- **MyMQueens/**
  - `index.html` — Punto de entrada
  - **src/**
    - `App.vue` — Componente raíz
    - **components/** — Componentes reutilizables (Vue + TS)
    - **views/** — Vistas principales de la app
    - **assets/** — Imágenes, estilos globales
  - **public/** — Archivos estáticos
  - `package.json` — Dependencias y scripts
  - `tsconfig.json` — Configuración de TypeScript
  - `vite.config.ts` — Configuración de Vite
  - `README.md` — Documentación del proyecto

## 🚀 Cómo ejecutar localmente

bash
# Clonar el repositorio
git clone https://github.com/Isaacjesusacevedo/MyMQueens.git

# Entrar al directorio
cd MyMQueens

# Instalar dependencias
npm install

🚧 Próximos pasos
Estoy ampliando la aplicación hacia el desarrollo full-stack:
Backend con Node.js + Express — API REST para gestionar turnos, clientes y servicios
Base de datos SQL Server — Persistencia de reservas, usuarios y disponibilidad horaria
Autenticación con JWT — Login para clientes y administradores
Panel de administración — Gestión de turnos, servicios y reportes
📬 Contacto
Email: isaac.acevedor1610@gmail.com
Portfolio: isaacjesusacevedo.github.io/Portfolio
LinkedIn: linkedin.com/in/isaac-acevedo-9a41a4282


# Modo desarrollo (hot reload)
npm run dev

# Build para producción
npm run build
