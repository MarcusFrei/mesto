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
const addCardBtn = document.getElementById("add-card-btn");
const pictureTitleInput = document.querySelector(".popup__input_picture-title");
const pictureLinkInput = document.querySelector(".popup__input_picture-link");
const likeButtons = document.querySelectorAll(".gallery__like-button");
const popupFullImage = document.getElementById("popup__full-size-picture");
// let activePopup = null;

const openPopup = (currentPopup) => {
  activePopup = currentPopup;
  currentPopup.classList.add("popup_opened");
};

const closePopup = (currentPopup) => {
  currentPopup.classList.remove("popup_opened");
  activePopup = null;
};

// document.addEventListener("keyup", (e) => {
//   if (e.keyCode === 27) {
//     if (activePopup !== null) closePopup(activePopup);
//   }
// });

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

  if (isNewCard) galleryBlock.insertBefore(newCard, galleryBlock.firstChild);
  else galleryBlock.append(newCard);
};

initialCards.forEach((card) => createCard(card));

btnOpenProfile.addEventListener("click", function () {
  openPopup(popupProfile);
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
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
  if (evt.target.classList.contains("gallery__like-button")) {
    evt.target.classList.toggle("gallery__like-button_active");
  }
}

function formSubmitHandler(evt) {
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
  createCard(tempObj, true);
}

formAddCardInfo.addEventListener("submit", formCardAddHandler);

popupInfoContainer.addEventListener("submit", formSubmitHandler);
