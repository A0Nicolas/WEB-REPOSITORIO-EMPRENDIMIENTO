const plantilla = document.createElement("template");
plantilla.innerHTML = `
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
  const valor = this.shadowRoot.getElementById("valor");
  if (!valor) return;
  this.shadowRoot.getElementById("unitario").textContent = this.precio.toFixed(2);
  this.shadowRoot.getElementById("cantidad").textContent = this.cantidad;
  valor.textContent = (this.precio * this.cantidad).toFixed(2);
 }
}

customElements.define("tarjeta-estefano", TarjetaEstefano);
