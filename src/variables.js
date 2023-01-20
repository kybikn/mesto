import karachayCherkessiaImage from './images/Karachay-Cherkessia.jpg';
import nalchikImage from './images/Nalchik.jpg';
import kabardinoBalkariyaImage from './images/Kabardino-Balkariya.jpg';
import karachaevskImage from './images/Karachaevsk.jpg';
import dombaiImage from './images/Dombai.jpg';
import elbrusImage from './images/Elbrus.jpg';

export const initialCards = [
  {
    name: 'Карачаево-Черкессия',
    link: karachayCherkessiaImage,
  },
  {
    name: 'Нальчик',
    link: nalchikImage,
  },
  {
    name: 'Кабардино-Балкария',
    link: kabardinoBalkariyaImage,
  },
  {
    name: 'Карачаевск',
    link: karachaevskImage,
  },
  {
    name: 'Домбай',
    link: dombaiImage,
  },
  {
    name: 'Эльбрус',
    link: elbrusImage,
  },
];

export const formParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
};

export const cardParameters = {
  imgSelector: '.card__img',
  titleSelector: '.card__title',
  likeButtonSelector: '.card__button-like',
  activeButtonClass: 'card__button-like_active',
  removeButtonSelector: '.card__button-remove',
  templateSelector: '#card',
  cardSelector: '.card',
  cardPopupSelector: '.popup_type_photo',
};

export const popupParameters = {
  popupSelector: '.popup',
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle',
  popupProfileSelector: '.popup_type_profile',
  popupPlaceSelector: '.popup_type_place',
  popupPhotoSelector: '.popup_type_photo',
};

export const popupImg = document.querySelector('.popup__img');
export const popupImgTitle = document.querySelector('.popup__img-title');
export const profileEditBtn = document.querySelector('.profile__button-edit');
export const profileAddBtn = document.querySelector('.profile__button-add');
export const formProfile = document.querySelector('.popup__form-profile');
export const formPlace = document.querySelector('.popup__form-place');
export const inputName = document.querySelector('.popup__input_type_name');
export const inputJob = document.querySelector('.popup__input_type_job');
export const inputPlace = document.querySelector('.popup__input_type_place');
export const inputLink = document.querySelector('.popup__input_type_link');
export const galleryList = document.querySelector('.gallery__list');
export const popupCloseBtn = document.querySelector('.popup__close');
