import html from "./profile-header.html?raw";

class ProfileHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.render();
  }

  render(): void {
    this.innerHTML = html;
  }
}

customElements.define("profile-header", ProfileHeader);
