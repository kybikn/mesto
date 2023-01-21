// все картинки добавляются корректно

import './index.css'; // добавьте импорт главного файла стилей
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

import {
  initialCards,
  cardParameters,
  formParameters,
  profileEditBtn,
  profileAddBtn,
  popupParameters,
  formProfile,
  formPlace,
} from '../variables.js';

// ----------------Инстансы------------------
/** Инстанс попапа профиля */
const popupProfileInstance = new PopupWithForm(
  popupParameters.popupProfileSelector,
  handleChangeValuePopupProfile,
  formParameters
);

/** Инстанс попапа места */
const popupPlaceInstance = new PopupWithForm(
  popupParameters.popupPlaceSelector,
  handleAddPlaceCard,
  formParameters
);

/** Инстанс попапа фото */
const popupPhotoInstance = new PopupWithImage(
  popupParameters.popupPhotoSelector,
  popupParameters.popupImgSelector,
  popupParameters.popupImgTitleSelector
);

/** Инстанс Section */
const section = new Section(
  { items: initialCards, renderer: renderer },
  '.gallery__list'
);

/** Инстанс UserInfo */
const userInfoInstance = new UserInfo(
  popupParameters.profileTitleSelector,
  popupParameters.profileSubtitleSelector
);

/** Инстанс формы профиля */
const profileFormValidator = new FormValidator(formParameters, formProfile);
/** Добавляем валидацию для формы профиля */
profileFormValidator.enableValidation();

/** Инстанс формы места */
const placeFormValidator = new FormValidator(formParameters, formPlace);
/** Добавляем валидацию для формы места */
placeFormValidator.enableValidation();

// ----------------Функции------------------
/** Функция добавления value в попап профиля */
function addValuePopupProfile() {
  const { userName, userJob } = userInfoInstance.getUserInfo();
  const data = { name: userName, job: userJob };
  popupProfileInstance.setInputValues(data);
}

/** Функция редактирования попапа профиля */
function handleChangeValuePopupProfile(event, inputValues) {
  event.preventDefault();
  userInfoInstance.setUserInfo({
    userName: inputValues.name,
    userJob: inputValues.job,
  });
  popupProfileInstance.close();
}

/** Функция добавления карточки места */
function handleAddPlaceCard(event, inputValues) {
  event.preventDefault();
  popupPlaceInstance.close();
  const cardData = { name: inputValues.place, link: inputValues.url };
  /** создает элемент карточки */
  const card = renderer(cardData);
  /** вставляет карточку в контейнер секции */
  section.addItem(card);
}

/** Функция открытия попапа фото */
function handleCardClick(name, link) {
  popupPhotoInstance.open(name, link);
}

/** Функция создания карточки */
function renderer(cardData) {
  const card = new Card(cardData, cardParameters, handleCardClick);
  return card.generateCard();
}
section.renderItems();

// ----------------Слушатели------------------
/** Слушатель и функция открытия попапа карточки места */
profileAddBtn.addEventListener('click', () => {
  placeFormValidator.resetValidation();
  popupPlaceInstance.open();
});

/** Слушатель и функция открытия попапа профиля */
profileEditBtn.addEventListener('click', () => {
  addValuePopupProfile();
  popupProfileInstance.open();
  /** убираем ошибки при повторном открытии после стирания данных */
  profileFormValidator.checkFormValidity();
});

/** Навешивание слушателя на закрытие попапа места */
popupPlaceInstance.setEventListeners();

/** Навешивание слушателя на закрытие попапа профиля */
popupProfileInstance.setEventListeners();

/** Навешивание слушателя на закрытие попапа фото  */
popupPhotoInstance.setEventListeners();
