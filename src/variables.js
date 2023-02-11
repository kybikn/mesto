import karachayCherkessiaImage from './images/Karachay-Cherkessia.jpg';
import nalchikImage from './images/Nalchik.jpg';
import kabardinoBalkariyaImage from './images/Kabardino-Balkariya.jpg';
import karachaevskImage from './images/Karachaevsk.jpg';
import dombaiImage from './images/Dombai.jpg';
import elbrusImage from './images/Elbrus.jpg';

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '7b00e02a-3f2c-4bad-82e7-40e09900d10e',
    'Content-Type': 'application/json',
  },
};

export const formParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  formProfileSelector: '.popup__form-profile',
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
  profileAvatarSelector: '.profile__avatar-img',
  popupProfileSelector: '.popup_type_profile',
  popupPlaceSelector: '.popup_type_place',
  popupPhotoSelector: '.popup_type_photo',
  popupAvatarSelector: '.popup_type_avatar',
  popupDeleteSelector: '.popup_type_delete',
  popupImgSelector: '.popup__img',
  popupImgTitleSelector: '.popup__img-title',
};

export const profileEditBtn = document.querySelector('.profile__button-edit');
export const profileAddBtn = document.querySelector('.profile__button-add');
export const profileAvatarBtn = document.querySelector('.profile__avatar-box');
export const formProfile = document.querySelector('.popup__form-profile');
export const formPlace = document.querySelector('.popup__form-place');
export const formAvatar = document.querySelector('.popup__form-avatar');
export const formDelete = document.querySelector('.popup__form-delete');
export const galleryList = document.querySelector('.gallery__list');
export const popupCloseBtn = document.querySelector('.popup__close');
