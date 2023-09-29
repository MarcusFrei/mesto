export class Card {
  constructor(
    data,
    templateSelector,
    openCard,
    handleLike,
    handleDelete,
    userId
  ) {
    this._cardTemplate = this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCard = openCard;
    this._likes = data.likes;
    this._userId = userId;
    this._id = data.owner._id;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  }

  _hideDeleteBtn() {
    if (this._userId !== this._id) {
      this._deleteButton.remove();
      console.log("remove");
    }
  }

  _getTemplate() {
    return document
      .getElementById(this._templateSelector)
      .content.querySelector(".gallery__block")
      .cloneNode(true);
  }

  isLiked() {
    return this._likes.some((elem) => elem._id === this._userId);
  }
  addlike() {
    this._likeButton.classList.add("gallery__like-button_active");
  }
  deleteLike() {
    this._likeButton.classList.remove("gallery__like-button_active");
  }
  deleteCard() {
    this._element.remove();
  }

  _setListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    this._likeButton.addEventListener("click", this._handleLike);

    this._currentImg.addEventListener("click", () =>
      this._openCard({ name: this._name, link: this._link })
    );

    if (this.isLiked()) {
      this.addlike();
    }
  }

  createCard() {
    this._element = this._getTemplate();
    this._currentImg = this._element.querySelector(".gallery__image");
    this._currentImg.src = this._link;
    this._currentImg.alt = this._name;
    const currentTitle = this._element.querySelector(".gallery__photo-name");
    this._likesCount = this._element.querySelector(".gallery__like-counter");
    this.setLikeCount(this._likes);
    currentTitle.textContent = this._name;
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._deleteButton = this._element.querySelector(
      ".gallery__block-button-delete"
    );
    this._hideDeleteBtn();
    this._setListeners();

    return this._element;
  }

  setLikeCount(countArr) {
    this._likes = countArr;
    this._likesCount.textContent = this._likes.length;
  }
}
