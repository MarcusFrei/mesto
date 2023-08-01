const popup = document.getElementById("popup__profile");
const popupCloseArr = document.querySelectorAll(".popup__close");
const popupOpen = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about-yourself");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputAbout = document.querySelector(".popup__input_type_about");
const profileInfo = document.querySelector(".profile__info");
const formElement = document.querySelector(".popup__info-container");
const profileEditBtn = document.querySelector(".profile__add-button");
const galleryBlock = document.querySelector(".gallery__blocks");
const cardPopup = document.getElementById("popup__add-card");
const addCardBtn = document.getElementById("add-card-btn");
const pictureTitleInput = document.querySelector(".popup__input_picture-title");
const pictureLinkInput = document.querySelector(".popup__input_picture-link");
const likeButtons = document.querySelectorAll(".gallery__like-button");
const popupFullImage = document.getElementById("popup__full-size-picture");

const openFullImage = ({ name, link }) => {
  const popupImg = document.querySelector(".popup__full-image");
  const popupDesc = document.querySelector(".popup__image_title");
  popupImg.src = link;
  popupDesc.textContent = name;
  popupFullImage.classList.add("popup_opened");
};

const createCard = (cardProps, isNewCard = false) => {
  const listElem = document.createElement("li");
  listElem.classList.add("gallery__block");
  const imgCard = document.createElement("img");
  imgCard.addEventListener("click", () => openFullImage(cardProps));
  imgCard.classList.add("gallery__image");
  imgCard.src = cardProps.link;
  imgCard.alt = cardProps.name;
  listElem.append(imgCard);
  const cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.classList.add("gallery__block-button-delete");
  listElem.append(cardDeleteBtn);
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("gallery__info");
  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("gallery__photo-name");
  cardTitle.textContent = cardProps.name;
  cardInfo.append(cardTitle);
  const cardLike = document.createElement("button");
  cardLike.addEventListener("click", () => {
    const currentBackgroundImage = cardLike.style.backgroundImage;
    cardLike.style.backgroundImage =
      currentBackgroundImage === `url("./images/black-heart.svg")`
        ? "url(./images/heart.svg)"
        : "url(./images/black-heart.svg)";
  });
  cardLike.classList.add("gallery__like-button");
  cardInfo.append(cardLike);
  listElem.append(cardInfo);
  if (isNewCard) galleryBlock.insertBefore(listElem, galleryBlock.firstChild);
  else galleryBlock.append(listElem);
};

initialCards.forEach((card) => createCard(card));

popupOpen.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  popupInputName.value = profileName.textContent;
  popupInputAbout.value = profileAbout.textContent;
});

for (const closeBtn of popupCloseArr) {
  closeBtn.addEventListener("click", () => {
    const parent = closeBtn.closest(".popup");
    parent.classList.remove("popup_opened");
  });
}

profileEditBtn.addEventListener("click", function () {
  cardPopup.classList.add("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  popup.classList.remove("popup_opened");
}

function formCardAddHandler(evt) {
  evt.preventDefault();
  const tempObj = {
    name: pictureTitleInput.value,
    link: pictureLinkInput.value,
  };
  createCard(tempObj, true);
  const parent = pictureTitleInput.closest(".popup");
  parent.classList.remove("popup_opened");
}

addCardBtn.addEventListener("click", (e) => formCardAddHandler(e));

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

// likeButtons.forEach((likeButton) => {
//   likeButton.addEventListener("click", () => {

//     const currentBackgroundImage = likeButton.style.backgroundImage;
//     likeButton.style.backgroundImage =
//       currentBackgroundImage === `url("./images/black-heart.svg")`
//         ? "url(./images/heart.svg)"
//         : "url(./images/black-heart.svg)";
//   });
// });
