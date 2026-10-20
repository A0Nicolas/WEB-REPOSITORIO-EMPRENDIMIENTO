# Estéfano - tarjeta-estefano

**Rama:** `Tarjeta-Estefano`

**Qué hice:** Creé el componente `tarjeta-estefano`, que presenta un producto con su precio unitario, cantidad y total calculado.

## Paso 1

Registré el componente con `customElements.define`. El nombre incluye un guion porque es un requisito de los elementos personalizados HTML. También añadí su importación como módulo en `index.html`.

## Paso 2

La plantilla utiliza los slots `foto`, `nombre` y uno sin nombre para la descripción. Cuando no se proporciona una descripción, muestra el texto alternativo `Sin descripción`.

## Paso 3

El componente observa los atributos `precio` y `cantidad`. Cuando alguno cambia, `attributeChangedCallback` actualiza los valores mostrados. El color principal es `#b5446e` y el color de respaldo definido en el componente es `gray`.

## Paso 4

Agregué tres productos de pastelería: torta tres leches (`$3.50` x `2`), brownie con nueces (`$1.75` x `4`) y cheesecake de mora (`$4.00` x `1`).
