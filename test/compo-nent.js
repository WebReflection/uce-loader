customElements.define('compo-nent', class extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Hello loader!';
  }
});
