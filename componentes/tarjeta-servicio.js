export class TarjetaServicio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
}
customElements.define("tarjeta-servicio", TarjetaServicio);