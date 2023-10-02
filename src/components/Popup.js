export class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  openPopup() {
    this._selector.classList.add("popup_opened");
    document.addEventListener("keyup", this._closeByEscape);
    console.log(this._selector);
  }

  closePopup() {
    this._selector.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._closeByEscape);
  }

  _closeByEscape = (e) => {
    if (e.key === "Escape") {
      this.closePopup();
    }
  };

  setEventListeners() {
    document.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.closePopup();
      } else {
      }
    });
  }
}
