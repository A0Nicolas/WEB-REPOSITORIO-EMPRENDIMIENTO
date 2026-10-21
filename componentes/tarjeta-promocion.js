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

    /* 3 · Estilo llamativo para el descuento */
    .descuento-badge {
      display: inline-flex;
      align-items: center;
      align-self: center;
      gap: 6px;
      padding: 6px 16px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 0.5rem;
      background: linear-gradient(135deg, #ff5252, #ff7043);
      color: #fff;
      box-shadow: 0 3px 10px rgba(255, 82, 82, 0.35);
      animation: pulso 2s ease-in-out infinite;
    }

    @keyframes pulso {
      0%, 100% { transform: scale(1); }
      50%      { transform: scale(1.04); }
    }

    .descuento-badge .icono {
      font-size: 1rem;
    }

    .descuento-badge.sin-descuento {
      background: #e0e0e0;
      color: #888;
      box-shadow: none;
      animation: none;
    }

    /* Zona de precios */
    .precios {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 0.5rem;
      flex-wrap: wrap;
    }

    .precio-original {
      font-size: 1rem;
      color: #999;
      text-decoration: line-through;
    }

    .precio-final {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--color-marca, gray);
    }

    .ahorro {
      font-size: 0.75rem;
      color: #2e7d32;
      font-weight: 600;
      background: #e8f5e9;
      padding: 2px 8px;
      border-radius: 12px;
    }

    .ahorro.oculto,
    .precio-original.oculto {
      display: none;
    }
  </style>

  <slot name="foto"></slot>
  <div class="contenido">
    <slot name="nombre"></slot>
    <slot>Sin descripción</slot>
    <span class="descuento-badge" id="descuento-badge"><span class="icono">🏷️</span> <span id="descuento">0</span>% OFF</span>
    <div class="precios">
      <span class="precio-original oculto" id="precio-original">$0</span>
      <span class="precio-final">$<span id="valor">0</span></span>
      <span class="ahorro oculto" id="ahorro">Ahorras $0</span>
    </div>
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
    const hayDescuento = this.descuento > 0;
    if (badge) badge.classList.toggle("sin-descuento", !hayDescuento);

    // Fórmula: precio × (1 − descuento / 100)
    const final = this.precio * (1 - this.descuento / 100);
    spanValor.textContent = final.toFixed(2);

    // Precio original tachado y ahorro
    const spanOriginal = this.shadowRoot.getElementById("precio-original");
    const spanAhorro   = this.shadowRoot.getElementById("ahorro");

    if (spanOriginal) {
      spanOriginal.textContent = `$${this.precio.toFixed(2)}`;
      spanOriginal.classList.toggle("oculto", !hayDescuento);
    }
    if (spanAhorro) {
      const ahorro = this.precio - final;
      spanAhorro.textContent = `Ahorras $${ahorro.toFixed(2)}`;
      spanAhorro.classList.toggle("oculto", !hayDescuento);
    }
  }
}

customElements.define("tarjeta-promocion", TarjetaPromocion);
