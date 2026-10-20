export class TarjetaEstefano extends HTMLElement {
 constructor() {
 super();
 this.attachShadow({ mode: "open" });
 }
}
customElements.define("tarjeta-estefano", TarjetaEstefano);
