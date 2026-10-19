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
::slotted(img) {
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