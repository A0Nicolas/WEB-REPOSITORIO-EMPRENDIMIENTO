export class TarjetaProducto extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }
}

customElements.define("tarjeta-producto", TarjetaProducto);