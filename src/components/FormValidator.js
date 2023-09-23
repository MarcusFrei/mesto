export class FormValidator {
  constructor( formElement) {
    this._config = {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__save-button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    };
    this._formElement = formElement;
    this._submitBtn = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inputsArr = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
  }


 
  _checkInputValidity = (input) => {
    const inputName = input.name;
    const errorText = this._formElement.querySelector(`[data-target="${inputName}"]`);
    if (input.validity.valid) {
      errorText.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    } else {
      errorText.textContent = input.validationMessage;
      input.classList.add(this._config.inputErrorClass);
    }
  };

  _checkFormValidity = () => {
    const [firstInput, secondInput] =  this._inputsArr;
    return firstInput.validity.valid && secondInput.validity.valid
  };

  _setListeners() {
    this._inputsArr.forEach((input) => {
      input.addEventListener("input", () => {
        {
          this._checkInputValidity(input);
          if (this._checkFormValidity()) {
            this._submitBtn.removeAttribute("disabled");
          } else {
            this._submitBtn.disabled = true;
          }
        }
      });
    });

    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitBtn.disabled = true;
      e.target.reset();
    });
  }

  enableValidation() {
    this._setListeners();
  }
}

const submitButtonProfile = document.getElementById('submit-profile')
submitButtonProfile.disabled = true;
