# Fundación Compasyon / Fundafil - Pas — Sitio Web (Astro)

Sitio web oficial desarrollado con **Astro**, arquitectura modular por componentes y diseño adaptativo.

## 🚀 Comandos Rápidos

```bash
# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción (genera los archivos estáticos en /dist)
npm run build

# Previsualizar el sitio compilado
npm run preview
```

El servidor local se abrirá en `http://localhost:4321`.

---

## 📁 Estructura del Proyecto

```text
├── _html_backup/           # Respaldo seguro de los 18 archivos HTML originales
├── public/
│   └── assets/             # Imágenes, logos y fotografías estáticas
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Navbar.astro    # Barra de navegación con resaltado automático de página activa
│   │   ├── Footer.astro    # Pie de página unificado editable en un solo lugar
│   │   └── ScrollTop.astro # Botón para volver arriba
│   ├── layouts/
│   │   └── Layout.astro    # Plantilla global (<head>, fuentes, CSS, Navbar, Footer)
│   ├── pages/              # Páginas del sitio (rutas automáticas)
│   │   ├── index.astro
│   │   ├── sobre-nosotros.astro
│   │   ├── nuestro-equipo.astro
│   │   ├── programas.astro
│   │   ├── programa-juventud.astro
│   │   ├── programa-ninez.astro
│   │   ├── programa-infancia.astro
│   │   ├── programa-red-hogar.astro
│   │   ├── proyectos.astro
│   │   ├── impacto.astro
│   │   ├── como-apoyar.astro
│   │   ├── contacto.astro
│   │   └── donacion.astro
│   ├── styles/
│   │   └── styles.css      # Estilos CSS completos del proyecto
│   └── scripts/
│       └── main.js         # Interactividad y animaciones
└── dist/                   # Salida generada al compilar (archivos HTML listos para hosting)
```

---

## 🧩 ¿Cómo editar componentes?

* **Navbar:** Edita [src/components/Navbar.astro](src/components/Navbar.astro) para añadir o cambiar enlaces del menú.
* **Footer:** Edita [src/components/Footer.astro](src/components/Footer.astro) para actualizar teléfonos, redes sociales o enlaces legales. Los cambios se reflejarán en todas las páginas automáticamente.
