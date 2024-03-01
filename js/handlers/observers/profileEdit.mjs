export class ProfileEditObserver {
  constructor(avatarElement, bannerElement, name) {
    this.avatarElement = avatarElement;
    this.bannerElement = bannerElement;
    this.name = name;
  }

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
