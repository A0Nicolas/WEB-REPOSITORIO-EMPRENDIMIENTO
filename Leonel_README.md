# Leonel · `<tarjeta-promocion>`

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Completa |
|---|---|
| Rama | Tarjeta-Leonel |
| Componente | `<tarjeta-promocion>` |
| Descripción | Tarjeta de promoción que muestra un producto con su descuento y precio final calculado |

## Propuesta del emprendimiento

- Nombre del emprendimiento: **Pastelería - SweetFruits**
- Problema que resuelve: Mostrar el catálogo de productos de la pastelería con promociones y descuentos visibles de forma atractiva.
- Cliente al que se dirige: Amantes de la repostería y clientes de la pastelería SweetFruits.

## Cómo abrir el proyecto

1. Abre la carpeta en Visual Studio Code.
2. Clic derecho sobre `index.html` → **Open with Live Server**. Los módulos no cargan con `file://`.
3. Abre las herramientas del navegador (F12) y deja visible la pestaña **Consola**.

## Registro de los pasos

### Paso 1 · index.html y el módulo

- Etiqueta que registramos: `<tarjeta-promocion>`, registrada con `customElements.define("tarjeta-promocion", TarjetaPromocion)` en la línea 104 de `tarjeta-promocion.js`.
- ¿Por qué el nombre debe llevar guion?: Porque el estándar de Web Components lo exige. El guion evita conflictos con las etiquetas nativas de HTML (como `<div>`, `<p>`, etc.) y permite al navegador distinguir entre elementos personalizados y elementos estándar.
- Ruta del módulo y cómo lo importa la página: El módulo se encuentra en `./componentes/tarjeta-promocion.js` y la página lo importa con `<script type="module" src="./componentes/tarjeta-promocion.js"></script>` en el `<head>` del `index.html`.

### Paso 2 · Plantilla, Shadow DOM y slots

- Slots con nombre que tiene la plantilla:
  - `foto` → `<slot name="foto"></slot>` — recibe la imagen del producto.
  - `nombre` → `<slot name="nombre"></slot>` — recibe el título (`<h3>`) del producto.
- Texto de respaldo del slot sin nombre: `Sin descripción` — definido en `<slot>Sin descripción</slot>` (línea 45). Si el usuario no proporciona contenido en la Light DOM sin atributo `slot`, se muestra este texto.
- ¿Qué pasaría si no usáramos `cloneNode(true)`?: El contenido de la plantilla se **movería** al Shadow DOM de la primera tarjeta (nodo vivo), dejando la plantilla vacía. Las siguientes tarjetas no tendrían contenido que clonar y quedarían vacías. Con `cloneNode(true)` se crea una copia profunda e independiente para cada instancia del componente.

### Paso 3 · Atributo precio y estilos

- Método que reacciona cuando cambia `precio`: `attributeChangedCallback(nombre, anterior, valor)` (línea 70). Este callback se dispara automáticamente porque `precio` y `descuento` están declarados en el getter estático `observedAttributes` (línea 53-55), que retorna `["precio", "descuento"]`. Internamente llama al método `mostrar()` que calcula el precio final con la fórmula `precio × (1 − descuento / 100)` y actualiza los `<span>` del Shadow DOM.
- Color de marca (`--color-marca`) y dónde lo definimos: El color es `#c62828` (rojo oscuro) y se define en `estilos.css` dentro de la regla `tarjeta-promocion { --color-marca: #c62828; }` (línea 19-21). Desde la página (Light DOM) se le entrega la variable CSS al componente.
- Valor de respaldo que usa el componente si la página no define la variable: `gray`. Se usa en tres lugares dentro del componente:
  - `:host { border: 2px solid var(--color-marca, gray); }` — borde de la tarjeta.
  - `::slotted(h3) { color: var(--color-marca, gray); }` — color del título.
  - `.precio { color: var(--color-marca, gray); }` — color del precio.

### Paso 4 · Tres productos del emprendimiento

| # | Producto | Precio | Descuento | Precio Final | Imagen |
|---|---|---|---|---|---|
| 1 | Pastel de fresa (Brazo gitano) | $18.50 | 15% | $15.73 | `leonel-brazog.jpg` |
| 2 | Torta de café | $12.00 | 10% | $10.80 | `leonel-torta-cafe.jpg` |
| 3 | Torta de naranja | $15.75 | 0% | $15.75 | `leonel-torta-naranja.jpg` |

### Paso 5 · Repositorio del equipo

| Integrante | Qué hizo en este laboratorio |
|---|---|
| Leonel | Creó el componente `<tarjeta-promocion>` con Shadow DOM, slots (`foto`, `nombre`, default), atributos reactivos (`precio`, `descuento`), cálculo automático de precio final, variable CSS `--color-marca`, y el reto extra del atributo `destacado`. |

## Verificación

Marca con una `x` lo que ya comprobaste en el navegador.

- [x] La etiqueta tiene guion (`tarjeta-promocion`).
- [x] La página solo cambia lo que el componente expone con `var()` (`--color-marca`).
- [x] `setAttribute` cambia el precio en pantalla.
- [x] La consola no muestra errores.

Prueba que usamos en la consola:

```js
document.querySelector("tarjeta-promocion").setAttribute("precio", "25");
```

Resultado que vimos: El precio de la primera tarjeta se actualizó automáticamente. Con el descuento del 15%, el precio final mostrado cambió de $15.73 a $21.25 (25 × 0.85).

## Reto extra (opcional)

- [x] Atributo `destacado` que cambia el borde con `:host([destacado])`.

Implementación: en el CSS del componente (líneas 15-18 de `tarjeta-promocion.js`) se definió la regla `:host([destacado]) { border-color: gold; box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }`. La primera tarjeta (Pastel de fresa) tiene el atributo `destacado` en el `index.html` (línea 15).

## Estructura del proyecto

```
WEB-REPOSITORIO-EMPRENDIMIENTO/
├── index.html                       ← Página principal con 3 tarjetas
├── estilos.css                      ← Estilos de la página + --color-marca
├── componentes/
│   └── tarjeta-promocion.js         ← Web Component (clase TarjetaPromocion)
├── img/
│   ├── leonel-brazog.jpg            ← Imagen del brazo gitano
│   ├── leonel-torta-cafe.jpg        ← Imagen de la torta de café
│   └── leonel-torta-naranja.jpg     ← Imagen de la torta de naranja
├── README.md                        ← README general del equipo
└── Leonel_README.md                 ← Este archivo
```

## Métodos y propiedades del componente

| Elemento | Tipo | Descripción |
|---|---|---|
| `observedAttributes` | Getter estático | Retorna `["precio", "descuento"]` para que el navegador observe cambios en esos atributos |
| `constructor()` | Método | Llama a `super()` y crea el Shadow DOM con `attachShadow({ mode: "open" })` |
| `connectedCallback()` | Método | Clona la plantilla con `cloneNode(true)` y llama a `mostrar()` para el renderizado inicial |
| `attributeChangedCallback()` | Método | Se ejecuta cuando cambia `precio` o `descuento`; llama a `mostrar()` |
| `precio` | Propiedad (get/set) | Lee y escribe el atributo `precio` como número |
| `descuento` | Propiedad (get/set) | Lee y escribe el atributo `descuento` como número |
| `mostrar()` | Método privado | Calcula `precio × (1 − descuento/100)` y actualiza los `<span>` en el Shadow DOM |

## Uso de inteligencia artificial

- Herramienta usada (o «ninguna»): Antigravity IDE.
- Para qué la consultamos: La usamos principalmente como asistente de desarrollo para generar código basado en descripciones textuales (prompt-driven development). Específicamente, la consultamos para:
    - **Generar la plantilla base del Web Component** (`<tarjeta-promocion>`) con la estructura inicial de Shadow DOM y slots.
    - **Implementar la lógica de cálculo de precios** con descuentos y obtener la sintaxis correcta para la fórmula matemática.
- Qué cambiamos o comprobamos nosotros: Aunque la IA generó una gran parte del código, nosotros realizamos cambios importantes para asegurar la calidad y el cumplimiento de la rúbrica del docente: 
    1. **Renombramos el método:** Cambiamos `actualizarPrecio` a `mostrar` para ajustarnos a la terminología del resto del equipo.
    2. **Corregimos identificadores (IDs):** Ajustamos los IDs dentro del Shadow DOM de `precio-final` a `valor` para que coincidieran con la plantilla.
    3. **Refinamos los estilos:** Editamos las clases CSS (`extra` y `precio`) para mejorar la presentación y el espaciado.
    4. **Verificación de Rúbrica:** Comprobamos que el componente cumpliera con todos los requisitos de la rúbrica, especialmente en el uso de variables CSS (`--color-marca`) y la gestión del ciclo de vida del componente (`observedAttributes`, `attributeChangedCallback`).