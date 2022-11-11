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
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
];

const profileEditBtn = document.querySelector(".profile__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
const popup = document.querySelector(".popup");
const popupPlace = document.querySelector(".popup-place");
const popupPhoto = document.querySelector(".popup-photo");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputUrl = document.querySelector(".popup__input_type_url");
const profileTitleName = document.querySelector(".profile__title-name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupCloseBtn = document.querySelector(".popup__close");
const galleryList = document.querySelector(".gallery__list");
const tegTemplate = document.querySelector("#card").content;
const cardTemplate = tegTemplate.querySelector(".gallery__card");
const popupPhotoImg = document.querySelector(".popup-img");

const popupImg = document.querySelector(".popup-img");
const popupImgTitle = document.querySelector(".popup-img-title");
