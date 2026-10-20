// ───────── PASO 2 · Plantilla con Shadow DOM y slots ─────────
// Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      border: 2px solid var(--color-marca, gray);
      border-radius: 10px;
      padding: 1rem;
      text-align: center;
      background: #fff;
    }

    :host([destacado]) {
      border-color: gold;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }

    ::slotted(img) {
      max-width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
    }

    ::slotted(h3) {
      margin: 0.5rem 0;
      color: var(--color-marca, gray);
    }

    .extra {
      color: #555;
    }

    .precio {
      font-size: 22px;
      font-weight: bold;
      color: var(--color-marca, gray);
    }
  </style>

  <slot name="foto"></slot>
  <slot name="nombre"></slot>
  <slot>Sin descripción</slot>
  <p class="extra">Descuento: <span id="descuento">0</span>%</p>
  <p class="precio">$<span id="valor">0</span></p>
`;

export class TarjetaPromocion extends HTMLElement {

  // PASO 3 · Indica qué atributos observa el componente.
  static get observedAttributes() {
    return ["precio", "descuento"];
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
    this.mostrar();
  }

  attributeChangedCallback(nombre, anterior, valor) {
    // Comprueba que la plantilla ya esté clonada antes de tocar el DOM.
    this.mostrar();
  }

  // PASO 3 · Las propiedades leen y escriben el atributo, así quedan sincronizados.
  get precio() {
    return Number(this.getAttribute("precio")) || 0;
  }
  set precio(valor) {
    this.setAttribute("precio", valor);
  }

  get descuento() {
    return Number(this.getAttribute("descuento")) || 0;
  }
  set descuento(valor) {
    this.setAttribute("descuento", valor);
  }

  // Método interno: aplica la fórmula y actualiza los <span> del Shadow DOM.
  mostrar() {
    const spanValor = this.shadowRoot?.getElementById("valor");
    if (!spanValor) return;           // la plantilla aún no se clonó

    const spanDescuento = this.shadowRoot.getElementById("descuento");
    if (spanDescuento) spanDescuento.textContent = this.descuento;

    // Fórmula: precio × (1 − descuento / 100)
    const final = this.precio * (1 - this.descuento / 100);
    spanValor.textContent = final.toFixed(2);
  }
}

customElements.define("tarjeta-promocion", TarjetaPromocion);
