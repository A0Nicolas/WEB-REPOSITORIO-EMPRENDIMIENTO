// ───────── PASO 2 · Plantilla con Shadow DOM y slots ─────────
// Una sola plantilla, declarada fuera de la clase.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      border: 2px solid var(--color-marca, gray);
      border-radius: 12px;
      padding: 0;
      overflow: hidden;
      text-align: center;
      background: #fff;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    :host(:hover) {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    :host([destacado]) {
      border-color: gold;
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.5);
    }

    :host([destacado]:hover) {
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    /* 1 · Imagen uniforme: misma anchura y altura fija */
    ::slotted(img) {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }

    .contenido {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      flex: 1;
    }

    ::slotted(h3) {
      margin: 0.3rem 0;
      color: var(--color-marca, gray);
      font-size: 1.1rem;
    }

    /* 2 · Párrafo alineado a la izquierda */
    ::slotted(p) {
      text-align: left;
      margin: 0;
      font-size: 0.9rem;
      color: #444;
      line-height: 1.4;
    }

    /* 3 · Estilo especial para el descuento (badge / pill) */
    .descuento-badge {
      display: inline-block;
      align-self: center;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.3px;
      margin-top: 0.3rem;
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #a5d6a7;
    }

    .descuento-badge.sin-descuento {
      background: #f5f5f5;
      color: #999;
      border-color: #ddd;
    }

    .precio {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-marca, gray);
      margin: 0.5rem 0 0.3rem;
    }
  </style>

  <slot name="foto"></slot>
  <div class="contenido">
    <slot name="nombre"></slot>
    <slot>Sin descripción</slot>
    <span class="descuento-badge" id="descuento-badge">Descuento: <span id="descuento">0</span>%</span>
    <p class="precio">$<span id="valor">0</span></p>
  </div>
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

    // Alterna la clase del badge según si hay descuento o no
    const badge = this.shadowRoot.getElementById("descuento-badge");
    if (badge) badge.classList.toggle("sin-descuento", this.descuento === 0);

    // Fórmula: precio × (1 − descuento / 100)
    const final = this.precio * (1 - this.descuento / 100);
    spanValor.textContent = final.toFixed(2);
  }
}

customElements.define("tarjeta-promocion", TarjetaPromocion);
