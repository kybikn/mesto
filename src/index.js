import './pages/index.css'; // добавьте импорт главного файла стилей
import { Card } from './scripts/Card.js';
import { FormValidator } from './scripts/FormValidator.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';

import {
  popupImg,
  popupImgTitle,
  initialCards,
  cardParameters,
  formParameters,
  profileEditBtn,
  profileAddBtn,
  popupParameters,
  formProfile,
  formPlace,
  inputName,
  inputJob,
  inputPlace,
  inputLink,
} from './variables.js';

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
  popupParameters.popupPhotoSelector
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
  inputName.value = userName;
  inputJob.value = userJob;
}

/** Функция редактирования попапа профиля */
function handleChangeValuePopupProfile(event) {
  event.preventDefault();
  userInfoInstance.setUserInfo({
    userName: inputName.value,
    userJob: inputJob.value,
  });
  popupProfileInstance.close();
}

/** Функция добавления карточки места */
function handleAddPlaceCard(event) {
  event.preventDefault();
  popupPlaceInstance.close();
  const cardData = { name: inputPlace.value, link: inputLink.value };
  /** создает элемент карточки */
  const card = renderer(cardData);
  /** вставляет карточку в контейнер секции */
  section.addItem(card);
  formPlace.reset();
}

/** Функция открытия попапа фото */
function handleCardClick(name, link) {
  popupPhotoInstance.open(popupImg, popupImgTitle, name, link);
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

/** Навешивание слушателя на отправку формы попапа карточки места */
popupPlaceInstance.setEventListeners();

/** Навешивание слушателя на отправку формы попапа профиля */
popupProfileInstance.setEventListeners();
