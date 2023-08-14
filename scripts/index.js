const popupProfile = document.getElementById("popup__profile");
const popupAddCard = document.getElementById("popup__add-card");
const popupCloseArr = document.querySelectorAll(".popup__close");
const btnOpenProfile = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-yourself");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputAbout = document.querySelector(".popup__input_type_about");
const profileInfo = document.querySelector(".profile__info");
const popupInfoContainer = document.querySelector(".popup__info-container");
const formAddCardInfo = document.querySelector(".popup__add-new-card-info");
const profileAddBtn = document.querySelector(".profile__add-button");
const galleryBlock = document.querySelector(".gallery__blocks");
const cardPopup = document.getElementById("popup__add-card");
const pictureTitleInput = document.querySelector(".popup__input_picture-title");
const pictureLinkInput = document.querySelector(".popup__input_picture-link");
const popupFullImage = document.getElementById("popup__full-size-picture");
let activePopup = null;
const submitButton = formAddCardInfo.querySelector("button[type=submit]");
const imageError = document.getElementById("image-error");
const imageTextError = document.getElementById("image-text-error");
submitButton.disabled = true;
const nameError = document.getElementById("name-error");
const aboutYourselfError = document.getElementById("about-yourself-error");
const submitButtonProfile = popupInfoContainer.querySelector(
  "button[type=submit]"
);

submitButtonProfile.disabled = true;

const openPopup = (currentPopup) => {
  currentPopup.classList.add("popup_opened");
  activePopup = currentPopup;
};

const closePopup = (currentPopup) => {
  currentPopup.classList.remove("popup_opened");
  activePopup = null;
};

const openFullImage = ({ name, link }) => {
  const popupImg = document.querySelector(".popup__full-image");
  const popupDesc = document.querySelector(".popup__image-title");
  popupImg.src = link;
  popupDesc.textContent = name;
  openPopup(popupFullImage);
};

const createCard = (cardProps, isNewCard = false) => {
  const cardTemplate = document.getElementById("gallery-template");
  const newCard = cardTemplate.content.cloneNode(true);
  const currentImg = newCard.querySelector(".gallery__image");
  currentImg.src = cardProps.link;
  currentImg.alt = cardProps.name;
  currentImg.addEventListener("click", () => openFullImage(cardProps));
  const currentTitle = newCard.querySelector(".gallery__photo-name");
  currentTitle.textContent = cardProps.name;

  const deleteButton = newCard.querySelector(".gallery__block-button-delete");

  const likeButton = newCard.querySelector(".gallery__like-button");

  likeButton.addEventListener("click", likeBtnFnc);

  deleteButton.addEventListener("click", () =>
    deleteButton.closest(".gallery__block").remove()
  );

  return newCard;
};

const addNewCard = (cardProps, isNewCard = false) => {
  const newCard = createCard(cardProps);
  if (isNewCard) galleryBlock.insertBefore(newCard, galleryBlock.firstChild);
  else galleryBlock.append(newCard);
};

initialCards.forEach((card) => addNewCard(card));

btnOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);

  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
  validateAboutInfo();
});

for (const closeBtn of popupCloseArr) {
  closeBtn.addEventListener("click", () => {
    closePopup(closeBtn.closest(".popup"));
  });
}

profileAddBtn.addEventListener("click", () => {
  openPopup(cardPopup);
});

function likeBtnFnc(evt) {
  evt.target.classList.toggle("gallery__like-button_active");
}

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  closePopup(popupProfile);
}

function formCardAddHandler(evt) {
  evt.preventDefault();
  closePopup(popupAddCard);
  const tempObj = {
    name: pictureTitleInput.value,
    link: pictureLinkInput.value,
  };
  pictureTitleInput.value = "";
  pictureLinkInput.value = "";
  addNewCard(tempObj, true);
  submitButton.disabled = true;
}

popupInfoContainer.addEventListener("submit", formEditProfileSubmitHandler);

formAddCardInfo.addEventListener("submit", formCardAddHandler);

// Esc close
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    if (activePopup !== null) closePopup(activePopup);
  }
});
//

const closePopupOverlay = (e) => {
  if (
    [...e.target.classList].includes("popup") &&
    [...e.target.classList].includes("popup_opened")
  )
    closePopup(activePopup);
};
const overlayArr = document.querySelectorAll(".popup");

[...overlayArr].forEach((item) =>
  item.addEventListener("click", (e) => closePopupOverlay(e))
);

function validateAboutInfo() {
  const inputName = popupInfoContainer.querySelector("input[name='name']");

  if (!inputName.validity.valid) {
    nameError.textContent = "Вы пропустили это поле.";
    inputName.style.borderBottom = "1px solid #F00";
    if (inputName.value.length === 1) {
      nameError.textContent =
        "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
      inputName.style.borderBottom = "1px solid #F00";
    }
    submitButtonProfile.disabled = true;
  } else {
    nameError.textContent = "";
    inputName.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
  }
  const inputAbout = popupInfoContainer.querySelector("input[name='about']");
  if (!inputAbout.validity.valid) {
    aboutYourselfError.textContent = "Вы пропустили это поле.";
    inputAbout.style.borderBottom = "1px solid #F00";
    if (inputAbout.value.length === 1) {
      aboutYourselfError.textContent =
        "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
      inputAbout.style.borderBottom = "1px solid #F00";
    }
    submitButtonProfile.disabled = true;
  } else {
    aboutYourselfError.textContent = "";
    inputAbout.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
  }
  if (inputAbout.validity.valid && inputName.validity.valid)
    submitButtonProfile.disabled = false;
}
