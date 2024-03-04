/**
 * Represents an observer specifically for profile edits.
 */
export class ProfileEditObserver {
  /**
   * Creates an instance of ProfileEditObserver.
   * @param {HTMLImageElement} avatarElement - The avatar element to update.
   * @param {HTMLElement} bannerElement - The banner element to update.
   * @param {string} name - The name associated with the profile.
   */
  constructor(avatarElement, bannerElement, name) {
    /**
     * The avatar element to update.
     * @type {HTMLImageElement}
     */
    this.avatarElement = avatarElement;
    /**
     * The banner element to update.
     * @type {HTMLElement}
     */
    this.bannerElement = bannerElement;
    /**
     * The name associated with the profile.
     * @type {string}
     */
    this.name = name;
  }

  /**
   * Updates the avatar and banner elements with new profile data if the name matches.
   * @param {Object} data - The new profile data.
   */
  update(data) {
    if (data.name === this.name) {
      if (data.avatar) {
        this.avatarElement.src = data.avatar;
      }
      if (data.banner) {
        this.bannerElement.style.backgroundImage = `url(${data.banner})`;
      }
    }
  }
}
