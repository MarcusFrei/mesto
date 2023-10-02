import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._selector.querySelector(".popup__form");
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    this._sbmBtn = this._formElement.querySelector(".popup__save-button");
    this._sbmBtnText = this._sbmBtn.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      console.log(input);
      console.log(input.value);
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._sbmBtn.textContent = "Сохранение...";
    } else {
      this._sbmBtn.textContent = this._sbmBtnText;
    }
  }

  closePopup() {
    this._formElement.reset();
    super.closePopup();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}
