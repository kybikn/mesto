const initialCards = [
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
    name: "Домбай",
    link: "./images/Dombai.jpg",
  },
  {
    name: "Эльбрус",
    link: "./images/Elbrus.jpg",
  },
  {
    name: "Карачаевск",
    link: "./images/Karachaevsk.jpg",
  },
  // {
  //   name: "Архыз",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  // },
];

const profileEditBtn = document.querySelector(".profile__button-edit");
const profileAddBtn = document.querySelector(".profile__button-add");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup-profile");
const popupPlace = document.querySelector(".popup-place");
const popupPhoto = document.querySelector(".popup-photo");
const formProfile = document.querySelector(".popup__form-profile");
const formPlace = document.querySelector(".popup__form-place");
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_link");
const galleryList = document.querySelector(".gallery__list");
const tegTemplate = document.querySelector("#card").content;
const galleryCard = tegTemplate.querySelector(".gallery__card");
const popupCloseBtn = document.querySelector(".popup__close");
const popupImg = document.querySelector(".popup__img");
const popupImgTitle = document.querySelector(".popup__img-title");
