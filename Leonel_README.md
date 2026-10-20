# Leonel - tarjeta-promocion
Rama: Tarjeta-Leonel
Qué hice: la tarjeta-promocion, que muestra una promoción con su descuento y precio final.

## Paso 1
Registré la etiqueta tarjeta-promocion con customElements.define. Lleva guion porque así lo exige el estándar y no choca con las etiquetas de HTML. La página la importa con <script type="module" src="./componentes/tarjeta-promocion.js">.

## Paso 2
Slots: foto, nombre y uno sin nombre para la descripción. El texto de respaldo es "Sin descripción". Si no clonara la plantilla, el contenido se movería a la primera tarjeta y las demás quedarían vacías.

## Paso 3
El método que reacciona es attributeChangedCallback, porque precio y descuento están en observedAttributes. Mi color de marca es #c62828 y el valor de respaldo es gray en var(--color-marca, gray).

## Paso 4
Cheesecake de Fresa ($18.50, desc. 15%); Tarta de Arándanos ($12.00, desc. 10%); Mousse de Mango ($15.75, desc. 0%).
