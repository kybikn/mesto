export const initialCards = [
  {
    name: "Карачаево-Черкессия",
    link: "./images/Karachay-Cherkessia.jpg",
  },
  {
    name: "Нальчик",
    link: "./images/Nalchik.jpg",
  },
  {
    name: "Кабардино-Балкария",
    link: "./images/Kabardino-Balkariya.jpg",
  },
  {
    name: "Карачаевск",
    link: "./images/Karachaevsk.jpg",
  },
  {
    name: "Домбай",
    link: "./images/Dombai.jpg",
  },
  {
    name: "Эльбрус",
    link: "./images/Elbrus.jpg",
  },
];

export const formParameters = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
};

export const cardParameters = {
  imgSelector: ".card__img",
  titleSelector: ".card__title",
  likeButtonSelector: ".card__button-like",
  activeButtonClass: "card__button-like_active",
  removeButtonSelector: ".card__button-remove",
  templateSelector: "#card",
  cardSelector: ".card",
  cardPopupSelector: ".popup_type_photo",
  // popupImgSelector: ".popup__img",
  // popupImgTitleSelector: ".popup__img-title",
};

export const popupParameters = {
  popupSelector: ".popup",
  activePopupSelector: ".popup_active",
  activePopupClass: "popup_active",
  closeButtonClass: "popup__close",
};

export const popupImg = document.querySelector(".popup__img");
export const popupImgTitle = document.querySelector(".popup__img-title");
export const popupPhoto = document.querySelector(".popup_type_photo");

export const profileEditBtn = document.querySelector(".profile__button-edit");
export const profileAddBtn = document.querySelector(".profile__button-add");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupPlace = document.querySelector(".popup_type_place");
export const formProfile = document.querySelector(".popup__form-profile");
export const formPlace = document.querySelector(".popup__form-place");
export const inputName = document.querySelector(".popup__input_type_name");
export const inputJob = document.querySelector(".popup__input_type_job");
export const inputPlace = document.querySelector(".popup__input_type_place");
export const inputLink = document.querySelector(".popup__input_type_link");
export const galleryList = document.querySelector(".gallery__list");
export const popupCloseBtn = document.querySelector(".popup__close");
