const popup = document.querySelector(".popup");
const popupClose = popup.querySelector(".popup__close");
const popupOpen = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-yourself");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputAbout = document.querySelector(".popup__input_type_about");
const profileInfo = document.querySelector(".profile__info");
const formElement = document.querySelector(".popup__info-container");

popupOpen.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
});

popupClose.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);
