const plantilla = document.createElement("template");

plantilla.innerHTML = `
    <style>
        :host {
            display: block;
            background: #f5ead7;
            border: 2px solid var(--color-marca, #6f4e37);
            border-radius: 12px;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }

        .foto ::slotted(img) {
            width: 100%;
            height: 180px;
            object-fit: cover;
            display: block;
        }

        .cuerpo {
            padding: 14px;
        }

        ::slotted(h3) {
            margin: 0 0 8px 0;
            color: var(--color-marca, #6f4e37);
        }

        ::slotted(p) {
            color: #4b3428;
        }

        .precio {
            margin-top: 12px;
            font-size: 22px;
            font-weight: bold;
            color: var(--color-marca, #6f4e37);
        }
    </style>

    <div class="foto">
        <slot name="foto"></slot>
    </div>

    <div class="cuerpo">
        <slot name="nombre"></slot>

        <slot>Sin descripción</slot>

        <p class="precio">
            $<span id="valor">0.00</span>
        </p>
    </div>
`;

export class TarjetaProducto extends HTMLElement {

    static get observedAttributes() {
        return ["precio"];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.append(
            plantilla.content.cloneNode(true)
        );

        this.mostrar();
    }

    attributeChangedCallback(nombre, viejo, nuevo) {
        this.mostrar();
    }

    get precio() {
        return Number(this.getAttribute("precio"));
    }

    set precio(valor) {
        this.setAttribute("precio", valor);
    }

    mostrar() {
        const valor = this.shadowRoot.getElementById("valor");

        if (!valor) return;

        valor.textContent = this.precio.toFixed(2);
    }
}

customElements.define(
    "tarjeta-producto",
    TarjetaProducto
);