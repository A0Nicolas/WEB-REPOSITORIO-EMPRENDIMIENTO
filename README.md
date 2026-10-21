# 🧁 Pastelería SweetFruits — Repositorio del Equipo

**Programación Integrativa de Componentes Web · Unidad 1: Web Components**

| Dato | Detalle |
|---|---|
| **Emprendimiento** | Pastelería SweetFruits |
| **NRC** | 36642 |
| **Fecha** | Octubre 2026 |
| **Enlace del repositorio** | [github.com/A0Nicolas/WEB-REPOSITORIO-EMPRENDIMIENTO](https://github.com/A0Nicolas/WEB-REPOSITORIO-EMPRENDIMIENTO) |

---

## Integrantes del equipo

| Integrante | Rama | Componente | Rol |
|---|---|---|---|
| **Nicolás** | `Tarjeta-Nicolas` | `<tarjeta-producto>` | Productos de pastelería y estructura base del proyecto |
| **Sol** | `Tarjeta-Sol` | `<tarjeta-servicio>` | Servicios de cafetería |
| **Estéfano** | `Tarjeta-Estefano` | `<tarjeta-estefano>` | Ventas de pastelería (precio × cantidad) |
| **Leonel** | `Tarjeta-Leonel` | `<tarjeta-promocion>` | Promociones con descuento |

---

## Propuesta del emprendimiento

- **Nombre:** Pastelería SweetFruits
- **Problema que resuelve:** Mostrar el catálogo completo de una pastelería (productos, servicios, ventas y promociones) de forma visual y atractiva usando Web Components.
- **Cliente al que se dirige:** Amantes de la repostería y clientes de la pastelería SweetFruits.

---

## Cómo abrir el proyecto

1. Clona el repositorio y abre la carpeta en **Visual Studio Code**.
2. Clic derecho sobre `index.html` → **Open with Live Server**.
   > ⚠️ Los módulos ES no cargan con `file://`, es necesario un servidor local.
3. Abre las herramientas del navegador (`F12`) y deja visible la pestaña **Consola**.

---

## Estructura del proyecto

```
WEB-REPOSITORIO-EMPRENDIMIENTO/
├── index.html                          ← Página principal con header, navbar y footer
├── estilos.css                         ← Estilos de la página + variables --color-marca
├── componentes/
│   ├── tarjeta-producto.js             ← Nicolás · Productos de pastelería
│   ├── tarjeta-servicio.js             ← Sol · Servicios de cafetería
│   ├── tarjeta-estefano.js             ← Estéfano · Ventas con cantidad
│   └── tarjeta-promocion.js            ← Leonel · Promociones con descuento
├── img/
│   ├── pastel-cumpleanos.jpg           ← Nicolás
│   ├── pastel-chocolate.jpg            ← Nicolás
│   ├── pastel-frutos-rojos.jpg         ← Nicolás
│   ├── Taller_Barista.webp             ← Sol
│   ├── Catering_Oficinas.webp          ← Sol
│   ├── Arte_Latte.webp                 ← Sol
│   ├── estefano-tres-leches.jpg        ← Estéfano
│   ├── estefano-brownie.jpg            ← Estéfano
│   ├── estefano-cheesecake.jpg         ← Estéfano
│   ├── leonel-brazog.jpg               ← Leonel
│   ├── leonel-torta-cafe.jpg           ← Leonel
│   └── leonel-torta-naranja.jpg        ← Leonel
├── README.md                           ← Este archivo (README general del grupo)
├── Leonel_README.md                    ← README individual de Leonel
└── Estefano_README.md                  ← README individual de Estéfano
```

---

## Componentes Web del equipo

### 1. `<tarjeta-producto>` — Nicolás

| Característica | Detalle |
|---|---|
| **Archivo** | `componentes/tarjeta-producto.js` |
| **Atributos observados** | `precio` |
| **Slots** | `foto`, `nombre`, default (descripción) |
| **Texto de respaldo** | `Sin descripción` |
| **Color de marca** | `--color-marca: #6f4e37` (café) · fallback: `#6f4e37` |
| **Método principal** | `mostrar()` → muestra `precio.toFixed(2)` |

**Productos:**

| # | Producto | Precio |
|---|---|---|
| 1 | Pastel de Cumpleaños | $25.00 |
| 2 | Pastel de Chocolate | $22.00 |
| 3 | Pastel de Frutos Rojos | $28.00 |

---

### 2. `<tarjeta-servicio>` — Sol

| Característica | Detalle |
|---|---|
| **Archivo** | `componentes/tarjeta-servicio.js` |
| **Atributos observados** | `precio`, `duracion` |
| **Slots** | `foto`, `nombre`, default (descripción) |
| **Texto de respaldo** | `Sin descripción` |
| **Color de marca** | `--color-marca: #2e7d32` (verde) · fallback: `gray` |
| **Método principal** | `mostrar()` → muestra precio y duración en minutos |

**Servicios:**

| # | Servicio | Precio | Duración |
|---|---|---|---|
| 1 | Taller de barista | $20.00 | 90 min |
| 2 | Catering para oficinas | $45.00 | 120 min |
| 3 | Clase de latte art | $15.00 | 60 min |

---

### 3. `<tarjeta-estefano>` — Estéfano

| Característica | Detalle |
|---|---|
| **Archivo** | `componentes/tarjeta-estefano.js` |
| **Atributos observados** | `precio`, `cantidad` |
| **Slots** | `foto`, `nombre`, default (descripción) |
| **Texto de respaldo** | `Sin descripción` |
| **Color de marca** | `--color-marca: #b5446e` (rosa) · fallback: `gray` |
| **Método principal** | `mostrar()` → calcula `precio × cantidad` y muestra el total |

**Productos:**

| # | Producto | Precio unitario | Cantidad | Total |
|---|---|---|---|---|
| 1 | Torta tres leches | $3.50 | 2 | $7.00 |
| 2 | Brownie con nueces | $1.75 | 4 | $7.00 |
| 3 | Cheesecake de mora | $4.00 | 1 | $4.00 |

---

### 4. `<tarjeta-promocion>` — Leonel

| Característica | Detalle |
|---|---|
| **Archivo** | `componentes/tarjeta-promocion.js` |
| **Atributos observados** | `precio`, `descuento` |
| **Slots** | `foto`, `nombre`, default (descripción) |
| **Texto de respaldo** | `Sin descripción` |
| **Color de marca** | `--color-marca: #c62828` (rojo) · fallback: `gray` |
| **Método principal** | `mostrar()` → calcula `precio × (1 − descuento / 100)` |
| **Reto extra** | Atributo `destacado` con `:host([destacado])` (borde dorado + sombra) |

**Productos:**

| # | Producto | Precio | Descuento | Precio final |
|---|---|---|---|---|
| 1 | Pastel de fresa | $18.50 | 15% | $15.73 |
| 2 | Torta de café | $12.00 | 10% | $10.80 |
| 3 | Torta de naranja | $15.75 | 25% | $11.81 |

---

## Registro de los pasos (resumen grupal)

### Paso 1 · index.html y el módulo

Cada integrante registró su componente con `customElements.define("nombre-componente", Clase)`. Los nombres llevan guion porque el estándar de Web Components lo exige para diferenciar elementos personalizados de elementos nativos de HTML. Todos los módulos se importan en el `<head>` de `index.html` con `<script type="module">`.

### Paso 2 · Plantilla, Shadow DOM y slots

Los cuatro componentes comparten la misma estructura de slots:
- `foto` — recibe la imagen del producto.
- `nombre` — recibe el título (`<h3>`).
- Slot sin nombre — recibe la descripción; texto de respaldo: `Sin descripción`.

Se usa `cloneNode(true)` para crear una copia profunda de la plantilla en cada instancia, evitando que el nodo se mueva y deje vacías las siguientes tarjetas.

### Paso 3 · Atributo precio y estilos

Todos los componentes usan `attributeChangedCallback` para reaccionar a cambios de atributos. La variable CSS `--color-marca` se define desde la página (`estilos.css`) y penetra el Shadow DOM gracias a la herencia de custom properties.

| Componente | `--color-marca` | Fallback |
|---|---|---|
| `tarjeta-producto` | `#6f4e37` (café) | `#6f4e37` |
| `tarjeta-servicio` | `#2e7d32` (verde) | `gray` |
| `tarjeta-estefano` | `#b5446e` (rosa) | `gray` |
| `tarjeta-promocion` | `#c62828` (rojo) | `gray` |

### Paso 4 · Tres productos por integrante

| # | Integrante | Componente | Producto / Servicio | Precio | Atributo extra | Resultado |
|---|---|---|---|---|---|---|
| 1 | Nicolás  | `tarjeta-producto`  | Pastel de Cumpleaños    | $25.00 | —       | $25.00 |
| 2 | Nicolás  | `tarjeta-producto`  | Pastel de Chocolate     | $22.00 | —       | $22.00 |
| 3 | Nicolás  | `tarjeta-producto`  | Pastel de Frutos Rojos  | $28.00 | —       | $28.00 |
| 4 | Sol      | `tarjeta-servicio`  | Taller de barista       | $20.00 | 90 min  | $20.00 |
| 5 | Sol      | `tarjeta-servicio`  | Catering para oficinas  | $45.00 | 120 min | $45.00 |
| 6 | Sol      | `tarjeta-servicio`  | Clase de latte art      | $15.00 | 60 min  | $15.00 |
| 7 | Estéfano | `tarjeta-estefano`  | Torta tres leches       | $3.50  | ×2 uds  | $7.00  |
| 8 | Estéfano | `tarjeta-estefano`  | Brownie con nueces      | $1.75  | ×4 uds  | $7.00  |
| 9 | Estéfano | `tarjeta-estefano`  | Cheesecake de mora      | $4.00  | ×1 ud   | $4.00  |
| 10 | Leonel  | `tarjeta-promocion` | Pastel de fresa         | $18.50 | 15% dto | $15.73 |
| 11 | Leonel  | `tarjeta-promocion` | Torta de café           | $12.00 | 10% dto | $10.80 |
| 12 | Leonel  | `tarjeta-promocion` | Torta de naranja        | $15.75 | 25% dto | $11.81 |

### Paso 5 · Repositorio del equipo

| Integrante | Qué hizo en este laboratorio |
|---|---|
| **Nicolás** | Creó `<tarjeta-producto>` con Shadow DOM, slots y atributo `precio`. Estructuró el proyecto base y la página `index.html`. |
| **Sol** | Creó `<tarjeta-servicio>` con atributos `precio` y `duracion`. Agregó la sección de servicios de cafetería. |
| **Estéfano** | Creó `<tarjeta-estefano>` con atributos `precio` y `cantidad`, calculando el total automáticamente. |
| **Leonel** | Creó `<tarjeta-promocion>` con atributos `precio` y `descuento`, cálculo de precio final, y reto extra del atributo `destacado`. |

---

## Verificación

- [x] Todas las etiquetas personalizadas tienen guion.
- [x] La página solo cambia lo que los componentes exponen con `var()` (`--color-marca`).
- [x] `setAttribute` cambia los valores en pantalla dinámicamente.
- [x] La consola no muestra errores.

**Pruebas en consola:**

```js
// Producto
document.querySelector("tarjeta-producto").setAttribute("precio", "30");

// Servicio
document.querySelector("tarjeta-servicio").setAttribute("duracion", "45");

// Venta (Estéfano)
document.querySelector("tarjeta-estefano").setAttribute("cantidad", "5");

// Promoción (Leonel)
document.querySelector("tarjeta-promocion").setAttribute("descuento", "50");
```

---

## Reto extra

- [x] Leonel implementó el atributo `destacado` en `<tarjeta-promocion>` usando `:host([destacado])` con borde dorado y sombra.

---

## Página web

La página incluye:
- **Header sticky** con navbar (enlaces a Productos, Servicios, Ventas y Promociones).
- **4 secciones** con tarjetas de cada integrante.
- **Footer** con copyright y navegación secundaria.
- **Scroll suave** entre secciones.

---

## Uso de inteligencia artificial

- **Herramienta usada:** Antigravity IDE
- **Para qué la consultamos:** Asistencia en la generación de código para los Web Components, resolución de conflictos de merge y estructuración del HTML/CSS.
- **Qué cambiamos o comprobamos nosotros:** Verificación de rúbrica, ajuste de nombres de métodos y propiedades, corrección de estilos y pruebas manuales en consola.
