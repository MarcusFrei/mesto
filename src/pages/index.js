import '../index.html';
import './index.scss';

import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import { initialCards} from '../components/data';
import { Card } from '../components/Card';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { FormValidator } from '../components/FormValidator';
//const popupCloseArr = document.querySelectorAll(".popup__close");
const btnOpenProfile = document.querySelector(".profile__edit-button");
//const popupImg = document.querySelector(".popup__full-image");
//const popupDesc = document.querySelector(".popup__image-title");
//const profileName = document.querySelector(".profile__name");
//const profileAbout = document.querySelector(".profile__about-yourself");
const profileInfo = document.querySelector(".profile__info");
const popupInfoContainer = document.querySelector(".popup__info-container");
const formAddCardInfo = document.querySelector(".popup__add-new-card-info");
const profileAddBtn = document.querySelector(".profile__add-button");
//const galleryBlock = document.querySelector(".gallery__blocks");
//const pictureTitleInput = document.querySelector(".popup__input_picture-title");
//const pictureLinkInput = document.querySelector(".popup__input_picture-link");
const popupFullImage = document.getElementById("popup__full-size-picture");
let activePopup = null;
const submitButton = formAddCardInfo.querySelector("button[type=submit]");
//const imageError = document.getElementById("image-error");
const imageTextError = document.getElementById("image-text-error");
submitButton.disabled = true;
//const nameError = document.getElementById("name-error");
//const aboutYourselfError = document.getElementById("about-yourself-error");
const submitButtonProfile = popupInfoContainer.querySelector(
  "button[type=submit]"
);



submitButtonProfile.disabled = true;

// cards ->>>>>>>

const imgContainer = document.querySelector('.popup__image-container')
const popupOpenImage = new PopupWithImage(popupFullImage);
popupOpenImage.setEventListeners();

const openImage = () => {
  popupOpenImage.openFullImage(data.name, data.link)
}

const createNewCard = (data) => {
  console.log(data);
  const tempCard = new Card(data, "gallery-template", () => popupOpenImage.openFullImage(data)
  );
  return tempCard.createCard();
}

const cards = new Section({
  items: [],
  renderer: (items) => {
    const card = createNewCard(items)
    cards.addItem(card)
  }
} , '.gallery__blocks')

cards.render(initialCards)
// <<<<<<<<<- Cards


// cardAdd>>>>>>>>>
const cardPopup = document.getElementById("popup__add-card");
const popupAddCard = new PopupWithForm(cardPopup, (data)=>{
  const card = createNewCard(data)
  cards.addItem(card)
})
popupAddCard.setEventListeners();

profileAddBtn.addEventListener("click", () => {
 popupAddCard.openPopup();
});

// <<<<<<<CardADD


// userinfo >>>>>>
const userInformation = new UserInfo({nameSelector: '.profile__name', aboutSelector: ".profile__about-yourself"})


// <<<<<<<User info


const profilePopupElement = document.getElementById("popup__profile");

const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputAbout = document.querySelector(".popup__input_type_about");

const popupProfile = new PopupWithForm(profilePopupElement, (data) =>{
  userInformation.setUserInfo(data)
})

popupProfile.setEventListeners()

btnOpenProfile.addEventListener("click", function () {
  popupProfile.openPopup();
  const {name, about} = userInformation.getUserInfo()
 
  popupInputName.value = name;
  popupInputAbout.value = about;
});

//>>>>
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
