const plantilla = document.createElement("template");
plantilla.innerHTML = `
<div class="foto"><slot name="foto"></slot></div>
<div class="cuerpo">
<slot name="nombre"></slot>
<slot>Sin descripción</slot>
</div>
`;

export class TarjetaServicio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
this.shadowRoot.append(plantilla.content.cloneNode(true));
} 
}

customElements.define("tarjeta-servicio", TarjetaServicio);