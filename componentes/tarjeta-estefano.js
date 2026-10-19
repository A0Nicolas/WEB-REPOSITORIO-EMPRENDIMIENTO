const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      background: white;
      border: 2px solid var(--color-marca, gray);
      border-radius: 10px;
      overflow: hidden;
    }
    .foto ::slotted(img) {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .cuerpo {
      padding: 12px;
    }
    ::slotted(h3) {
      margin: 0;
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
  <div class="foto"><slot name="foto"></slot></div>
  <div class="cuerpo">
    <slot name="nombre"></slot>
    <slot>Sin descripción</slot>
    <p class="extra"><span id="cantidad">1</span> x $<span id="unitario">0</span></p>
    <p class="precio">Total: $<span id="valor">0</span></p>
  </div>
`;

export class TarjetaEstefano extends HTMLElement {
  static get observedAttributes() {
    return ["precio", "cantidad"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.append(plantilla.content.cloneNode(true));
    this.mostrar();
  }

  attributeChangedCallback(nombre, viejo, nuevo) {
    this.mostrar();
  }

  get precio() {
    return Number(this.getAttribute("precio"));
  }

  set precio(v) {
    this.setAttribute("precio", v);
  }

  get cantidad() {
    return Number(this.getAttribute("cantidad")) || 1;
  }

  set cantidad(v) {
    this.setAttribute("cantidad", v);
  }

  mostrar() {
    // si todavia no se clono la plantilla no hay donde escribir
    const valor = this.shadowRoot.getElementById("valor");
    if (!valor) return;
    this.shadowRoot.getElementById("unitario").textContent = this.precio.toFixed(2);
    this.shadowRoot.getElementById("cantidad").textContent = this.cantidad;
    valor.textContent = (this.precio * this.cantidad).toFixed(2);
  }
}

customElements.define("tarjeta-estefano", TarjetaEstefano);
