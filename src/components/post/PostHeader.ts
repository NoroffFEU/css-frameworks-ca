import html from "./post-header.html?raw";

class PostHeader extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  render(): void {
    this.innerHTML = html;
  }
}

customElements.define("post-header", PostHeader);
