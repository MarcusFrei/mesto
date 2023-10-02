import "../index.html";
import "./index.scss";
import { PopupWithImage } from "../components/PopupWithImage";
import { Section } from "../components/Section";
import { apiConfig } from "../utils/data";
import { Card } from "../components/Card";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
import { FormValidator } from "../components/FormValidator";
import { Api } from "../components/Api";
import { PopupWithAccept } from "../components/PopupWithAccept";

const btnOpenProfile = document.querySelector(".profile__edit-button");
const profileInfo = document.querySelector(".profile__info");
const popupInfoContainer = document.querySelector(".popup__info-container");
const formAddCardInfo = document.querySelector(".popup__add-new-card-info");
const profileAddBtn = document.querySelector(".profile__add-button");
const popupFullImage = document.getElementById("popup__full-size-picture");
let activePopup = null;
const submitButton = formAddCardInfo.querySelector("button[type=submit]");
const imageTextError = document.getElementById("image-text-error");
submitButton.disabled = true;

const api = new Api(apiConfig);
let userId = null;
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, user]) => {
    initialCards.reverse();
    userId = user._id;
    cards.renderItems(initialCards);

    userInformation.setUserInfo(user);
    userInformation.setUserAvatar(user);
  })
  .catch((e) => console.log(e));

// cards ->>>>>>>

const imgContainer = document.querySelector(".popup__image-container");
const popupOpenImage = new PopupWithImage(popupFullImage);
popupOpenImage.setEventListeners();

const openImage = () => {
  popupOpenImage.openFullImage(data.name, data.link);
};

const createNewCard = (data) => {
  const tempCard = new Card(
    data,
    "gallery-template",
    () => popupOpenImage.openFullImage(data),
    () => {
      if (tempCard.isLiked()) {
        console.log("delete");
        api
          .deleteLike(data._id)
          .then((response) => {
            console.log(response);
            tempCard.deleteLike();
            tempCard.setLikeCount(response.likes);
          })
          .catch((e) => console.log(e));
      } else {
        console.log("set");
        api
          .setLike(data._id)
          .then((response) => {
            tempCard.addlike();
            tempCard.setLikeCount(response.likes);
          })
          .catch((e) => console.log(e));
      }
    },
    () => {
      deleteCardPopup.open(data._id, tempCard);
      deleteCardPopup.handleSubmitDelete((cardId, tempCard) => {
        api
          .deleteCard(cardId)
          .then(() => {
            tempCard.deleteCard();
            deleteCardPopup.close();
          })
          .catch((e) => console.log(e));
      });
    },
    userId
  );
  return tempCard.createCard();
};

const cards = new Section(
  {
    items: [],
    renderer: (items) => {
      const card = createNewCard(items);
      cards.addItem(card);
    },
  },
  ".gallery__blocks"
);

// <<<<<<<<<- Cards

// ->DELETEPOPUP
const deletePopup = document.querySelector(".popup_delete");
const deleteCardPopup = new PopupWithAccept(deletePopup, (cardId, card) => {
  card.deleteCard();
});
deleteCardPopup.setEventListeners();
// -<<<<<<<<

// cardAdd>>>>>>>>>
const cardPopup = document.getElementById("popup__add-card");
const popupAddCard = new PopupWithForm(cardPopup, (data) => {
  api
    .sendNewCard(data)
    .then((info) => {
      const card = createNewCard(info);
      cards.addItem(card);
    })
    .catch((e) => console.log(e))
    .finally(() => popupAddCard.closePopup());
});
popupAddCard.setEventListeners();

profileAddBtn.addEventListener("click", () => {
  popupAddCard.openPopup();
});

// <<<<<<<CardADD

// userinfo >>>>>>
const userInformation = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about-yourself",
  avatarSelector: ".profile__image",
});

// <<<<<<<User info

const profilePopupElement = document.getElementById("popup__profile");

const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputAbout = document.querySelector(".popup__input_type_about");

const popupProfile = new PopupWithForm(profilePopupElement, (data) => {
  api
    .editProfile(data)
    .then((info) => userInformation.setUserInfo(info))
    .catch((e) => console.log(e))
    .finally(() => popupProfile.closePopup());
});

popupProfile.setEventListeners();

btnOpenProfile.addEventListener("click", function () {
  popupProfile.openPopup();
  const { name, about } = userInformation.getUserInfo();

  popupInputName.value = name;
  popupInputAbout.value = about;
});

const updateAvatar = document.getElementById("popup__photo-change");
const updateAvatarBtn = document.getElementById("profile__image");
const popupAvatar = new PopupWithForm(updateAvatar, (data) => {
  popupAvatar.renderLoading(true);
  api
    .updateAvatar(data)
    .then((response) => {
      console.log(response);
      userInformation.setUserAvatar(response);
    })
    .catch((e) => console.log(e))
    .finally(() => {
      popupAvatar.closePopup();
      popupAvatar.renderLoading(false);
    });
});
popupAvatar.setEventListeners();

updateAvatarBtn.addEventListener("click", () => {
  popupAvatar.openPopup();
});

const documentForms = [...document.querySelectorAll(".popup__form")];

documentForms.forEach((form) => {
  const tempForm = new FormValidator(form);
  tempForm.enableValidation();
});
