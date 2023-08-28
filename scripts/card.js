class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .getElementById(this._templateSelector)
      .content.cloneNode(true);
    return cardTemplate;
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle("gallery__like-button_active");
  }

  _openFullImage = ({ name, link }) => {
    popupImg.src = link;
    popupImg.alt = name;
    popupDesc.textContent = name;

    openPopup(popupFullImage);
  };

  _setListeners() {
    const deleteButton = this._element.querySelector(
      ".gallery__block-button-delete"
    );
    deleteButton.addEventListener("click", () => {
      deleteButton.closest(".gallery__block").remove();
    });

    const likeButton = this._element.querySelector(".gallery__like-button");
    likeButton.addEventListener("click", this._handleLikeBtn);

    const currentImg = this._element.querySelector(".gallery__image");
    currentImg.addEventListener("click", () =>
      this._openFullImage({ name: this._name, link: this._link })
    );
  }

  createCard() {
    this._element = this._getTemplate();
    const currentImg = this._element.querySelector(".gallery__image");
    currentImg.src = this._link;
    currentImg.alt = this._name;
    const currentTitle = this._element.querySelector(".gallery__photo-name");
    currentTitle.textContent = this._name;
    this._setListeners();
    return this._element;
  }
}
