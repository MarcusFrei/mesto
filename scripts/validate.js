const profileObj = {
  form: popupInfoContainer,
  formInputs: [
    {
      inputName: "name",
      inputErrorId: "name-error",
      inputErrorText: [
        "Вы пропустили это поле.",
        "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.",
      ],
    },
    {
      inputName: "about",
      inputErrorId: "about-yourself-error",
      inputErrorText: [
        "Вы пропустили это поле.",
        "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.",
      ],
    },
  ],
};

const cardObj = {
  form: formAddCardInfo,
  formInputs: [
    {
      inputName: "picture-title",
      inputErrorId: "image-text-error",
      inputErrorText: [
        "Вы пропустили это поле.",
        "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.",
      ],
    },
    {
      inputName: "picture-link",
      inputErrorId: "image-error",
      inputErrorText: ["Введите адрес сайта."],
    },
  ],
};

formAddCardInfo.addEventListener("input", () => enableValidation(cardObj));

popupInfoContainer.addEventListener("input", () =>
  enableValidation(profileObj)
);

function validateInput(input, error, errorText, submitBtn) {
  if (!input.validity.valid) {
    error.textContent = errorText[0];
    input.style.borderBottom = "1px solid #F00";
    if (errorText.length !== 1) {
      if (input.value.length === 1) {
        error.textContent = errorText[1];
        input.style.borderBottom = "1px solid #F00";
      }
    }
    submitBtn.disabled = true;
    return false;
  } else {
    error.textContent = "";
    input.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
  }
  return true;
}

function enableValidation({ form, formInputs }) {
  const btn = form.querySelector("button[type=submit]");
  let flag = true;
  formInputs.forEach((input) => {
    const inputObj = form.querySelector(`input[name=${input.inputName}]`);
    const inputErrorObj = document.getElementById(input.inputErrorId);
    if (!validateInput(inputObj, inputErrorObj, input.inputErrorText, btn))
      flag = false;
  });
  if (flag) btn.disabled = false;
}
