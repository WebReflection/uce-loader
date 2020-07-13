customElements.define('what-ever', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      ${this.nodeName.toLowerCase()} is connected<br>
      <whatever-else></whatever-else>
    `;
  }
});
