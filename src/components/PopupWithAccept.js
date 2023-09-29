import { Popup } from "./Popup";

export class PopupwithAccept extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
    this._acceptBtn = selector.querySelector(".popup__delete-button");
    this._setEventListeners = this._setEventListeners.bind(this);
  }

  _setEventListeners() {
    console.log(this._id);
    this._submitForm(this._id, this._card);
  }

  handleSubmitDelete(submitFunc) {
    this._submitForm = submitFunc;
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.openPopup();
    this._acceptBtn.addEventListener("click", this._setEventListeners);
  }

  close() {
    super.closePopup();
    this._acceptBtn.removeEventListeners("click", this._setEventListeners);
  }
}
