export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    console.log(name);
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}
