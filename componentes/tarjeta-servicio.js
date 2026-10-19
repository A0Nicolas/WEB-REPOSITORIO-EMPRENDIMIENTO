const plantilla = document.createElement("template");
plantilla.innerHTML = `
<div class="foto"><slot name="foto"></slot></div>
<div class="cuerpo">
    <slot name="nombre"></slot>
    <p><slot>Sin descripción</slot></p>
    <p class="extra"><span id="duracion">0</span> min</p>
    <p class="precio">\$<span id="valor">0</span></p>
</div>
`;

export class TarjetaServicio extends HTMLElement {
   static get observedAttributes() {
        return ["precio", "duracion"];
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

    get duracion() {
        return Number(this.getAttribute("duracion"));
    }
    set duracion(v) {
        this.setAttribute("duracion", v);
    }
    mostrar() {
        const valor = this.shadowRoot.getElementById("valor");
        if (!valor) return;
        
        valor.textContent = this.precio.toFixed(2);
        this.shadowRoot.getElementById("duracion").textContent = this.duracion;
    }   
}

customElements.define("tarjeta-servicio", TarjetaServicio);