export class Card {
  constructor(data, templateSelector, openCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCard = openCard;
  }

  _getTemplate() {
    return document
        .getElementById(this._templateSelector)
        .content
        .cloneNode(true);
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle("gallery__like-button_active");
  }

  _setListeners() {
    const deleteButton = this._element.querySelector(
      ".gallery__block-button-delete"
    );
    deleteButton.addEventListener("click", () => {
      deleteButton.closest(".gallery__block").remove();
    });

    const likeButton = this._element.querySelector(".gallery__like-button");
    likeButton.addEventListener("click", this._handleLikeBtn);

    this._currentImg.addEventListener("click", () =>
      this._openCard({ name: this._name, link: this._link })
    );
  }

  createCard() {
    this._element = this._getTemplate();
    this._currentImg = this._element.querySelector(".gallery__image");
    this._currentImg.src = this._link;
    this._currentImg.alt = this._name;
    const currentTitle = this._element.querySelector(".gallery__photo-name");
    currentTitle.textContent = this._name;
    this._setListeners();
    return this._element;
  }
}
