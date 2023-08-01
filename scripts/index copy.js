const popup = document.getElementById("popup__profile");
const popupClose = popup.querySelector(".popup__close");
const popupOpen = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-yourself");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputAbout = document.querySelector(".popup__input_type_about");
const profileInfo = document.querySelector(".profile__info");
const formElement = document.querySelector(".popup__info-container");
const addCardBtn = document.querySelector(".profile__add-button");
const cardPopup = document.getElementById("popup__add-card");

popupOpen.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
});

popupClose.addEventListener("click", function () {
  console.log(this);
  console.log(123);
  popup.classList.remove("popup_opened");
});

addCardBtn.addEventListener("click", function () {
  cardPopup.classList.add("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);

// Delete button logic
const deleteButtons = document.querySelectorAll(
  ".gallery__block-button-delete"
);

for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener("click", () => {
    const parent = deleteButton.closest(".gallery__block");
    parent.remove();
  });
}

// Like button logic

// v.0.2

const likeButtons = document.querySelectorAll(".gallery__like-button");

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    const currentBackgroundImage = likeButton.style.backgroundImage;
    likeButton.style.backgroundImage =
      currentBackgroundImage === `url("./images/black-heart.svg")`
        ? "url(./images/heart.svg)"
        : "url(./images/black-heart.svg)";
  });
});
