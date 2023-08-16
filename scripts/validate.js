// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const checkFormValidity = ([firstInput, secondInput]) => {
  if (firstInput.validity.valid && secondInput.validity.valid) return true;
  return false;
};

const checkInputValidity = (input, validConfig, form) => {
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

const checkFormsValidity = (forms, validConfig) => {
  forms.forEach((form) => {
    const submitBtn = form.querySelector("button[type=submit]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      e.target.reset();
    });
    const formInputs = [...form.querySelectorAll(validConfig.inputSelector)];
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        {
          checkInputValidity(input, validConfig, form);
          if (checkFormValidity(formInputs)) {
            submitBtn.removeAttribute("disabled");
          } else {
            submitBtn.disabled = true;
          }
        }
      });
    });
  });
};

const enableValidation = (validConfig) => {
  const documentForms = [
    ...document.querySelectorAll(validConfig.formSelector),
  ];
  checkFormsValidity(documentForms, validConfig);
};

enableValidation(validationConfiguration);
