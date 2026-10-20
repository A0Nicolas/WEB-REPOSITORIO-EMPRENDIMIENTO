// ───────── PASO 2 · Plantilla con Shadow DOM y slots ─────────
// Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    /* PASO 3 · Escribe aquí los estilos del componente:
       - :host con display y un borde
       - el color de marca leído con var(--color-marca, un-color-de-respaldo)
       - ::slotted(...) para la foto y el nombre que llegan de la página
       RETO EXTRA · :host([destacado]) que cambie el borde */
  </style>

  <slot name="foto"></slot>
  <slot name="nombre"></slot>
  <slot>Sin descripción</slot>
  <p>Precio: $<span id="precio">0</span></p>
`;

export class TarjetaPromocion extends HTMLElement {

  // PASO 3 · Indica qué atributos observa el componente.
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    // PASO 2 · Crea el Shadow DOM en modo "open".
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // PASO 2 · Agrega al Shadow DOM una COPIA de la plantilla con cloneNode(true).
    this.shadowRoot.appendChild(plantilla.content.cloneNode(true));
    // PASO 3 · Muestra el precio inicial.
  }

  attributeChangedCallback(nombre, anterior, valor) {
    // PASO 3 · Cuando cambie "precio", actualiza lo que se ve en pantalla.
    // Ojo: si el atributo ya viene escrito en el HTML, este método se ejecuta
    // ANTES que connectedCallback; comprueba que la plantilla ya esté clonada.
  }

  // PASO 3 · La propiedad lee y escribe el atributo, así quedan sincronizados.
  get precio() {
    return 0;
  }

  set precio(valor) {
  }
}

customElements.define("tarjeta-promocion", TarjetaPromocion);
