// ProfileEditObserver.mjs
export class ProfileEditObserver {
    constructor(avatarElement, bannerElement, name) {
      this.avatarElement = avatarElement;
      this.bannerElement = bannerElement;
      this.name = name;
    }
  
    update(data) {
      console.log("Observer: Update called with data:", data);
  
      // Check if the name in the data matches the observer's name
      if (data.name === this.name) {
        // Update avatar if it exists
        if (data.avatar) {
          this.avatarElement.src = data.avatar;
          console.log("Avatar updated");
        }
  
        // Update banner if it exists
        if (data.banner) {
          this.bannerElement.style.backgroundImage = `url(${data.banner})`;
          console.log("Banner updated");
        }
      }
    }
  }
  
