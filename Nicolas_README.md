### Nicolas

**Componente:** `<tarjeta-producto>`

Desarrollé el componente `tarjeta-producto`, utilizado para
mostrar los productos de la pastelería.

El componente contiene:

- Imagen mediante `slot="foto"`.
- Nombre mediante `slot="nombre"`.
- Descripción mediante un slot sin nombre.
- Precio mediante el atributo `precio`.
- Shadow DOM para encapsular la estructura y los estilos.
- Una plantilla reutilizable con `template`.
- Estilos configurables mediante `--color-marca`.

El método `attributeChangedCallback` permite actualizar el precio
cuando cambia el atributo `precio`.

La propiedad `precio` está sincronizada con el atributo mediante
getter y setter.

El color de marca utilizado es `#6f4e37`, correspondiente a una
paleta café y beige para la identidad visual de la pastelería.

Productos agregados:

1. Pastel de Cumpleaños — $25.00
2. Pastel de Chocolate — $22.00
3. Pastel de Frutos Rojos — $28.00