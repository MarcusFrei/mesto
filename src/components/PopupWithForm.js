import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(selector,  handleSubmitForm ) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._selector.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));

  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      super.closePopup()
    });
  }

  // close() {
  //   console.log('close');
  //   super.close();
  //   this._formElement.reset();
  // }
}
