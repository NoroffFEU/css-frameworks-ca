import html from "./nav-header.html?raw";

class NavHeader extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  render(): void {
    this.innerHTML = html;
  }
}

customElements.define("nav-header", NavHeader);
