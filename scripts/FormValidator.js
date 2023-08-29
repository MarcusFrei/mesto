class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitBtn = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inputsArr = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
  }

  _checkInputValidity = (input, validConfig, form) => {
    const inputName = input.name;
    const errorText = form.querySelector(`[data-target="${inputName}"]`);
    if (input.validity.valid) {
      errorText.textContent = "";
      input.classList.remove(validConfig.inputErrorClass);
    } else {
      errorText.textContent = input.validationMessage;
      input.classList.add(validConfig.inputErrorClass);
    }
  };

  _checkFormValidity = ([firstInput, secondInput]) => {
    if (firstInput.validity.valid && secondInput.validity.valid) return true;
    return false;
  };

  _setListeners() {
    this._inputsArr.forEach((input) => {
      input.addEventListener("input", () => {
        {
          this._checkInputValidity(input, this._config, this._formElement);
          if (this._checkFormValidity(this._inputsArr)) {
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

const validationConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const documentForms = [
  ...document.querySelectorAll(validationConfiguration.formSelector),
];

documentForms.forEach((form) => {
  const tempForm = new FormValidator(validationConfiguration, form);
  tempForm.enableValidation();
});
