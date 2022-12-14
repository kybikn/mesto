import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  popupImg,
  popupImgTitle,
  initialCards,
  cardParameters,
  formParameters,
  profileEditBtn,
  profileAddBtn,
  profileTitle,
  profileSubtitle,
  popupProfile,
  popupPlace,
  formProfile,
  formPlace,
  inputName,
  inputJob,
  inputPlace,
  inputLink,
  galleryList,
  popupPhoto,
} from "./variables.js";
import { openPopup, closePopup } from "./popup.js";

/** Функция добавления value в попап профиля */
function addValuePopupProfile() {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}

/** Функция редактирования попапа профиля */
function handleChangeValuePopupProfile(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupProfile);
}

/** Функция добавления карточки места */
function handleAddPlaceCard(event) {
  event.preventDefault();
  closePopup(popupPlace);
  const cardData = { name: inputPlace.value, link: inputLink.value };
  renderCard(cardData);
  formPlace.reset();
}

/** Функция открытия попапа профиля */
profileEditBtn.addEventListener("click", () => {
  addValuePopupProfile();
  openPopup(popupProfile);
  /** убираем ошибки при повторном открытии после стирания данных */
  profileFormValidator.checkFormValidity();
});

/** Функция открытия попапа карточки места */
profileAddBtn.addEventListener("click", () => {
  placeFormValidator.resetValidation();
  openPopup(popupPlace);
});

/** Функция открытия попапа фото ? */
function handleCardClick(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupImgTitle.textContent = name;
  openPopup(popupPhoto);
}

/** Функция создания карточки */
function createCard(cardData) {
  const card = new Card(cardData, cardParameters, openPopup, handleCardClick);
  return card.generateCard();
}

/** Функция рендеринга карточки */
function renderCard(cardData) {
  galleryList.prepend(createCard(cardData));
}

/** Функция рендеринга карточек */
function render() {
  initialCards.forEach(renderCard);
}
render();

/** Навешивание слушателей */
formProfile.addEventListener("submit", handleChangeValuePopupProfile);
formPlace.addEventListener("submit", handleAddPlaceCard);

/** Добавляем валидацию для формы профиля */
const profileFormValidator = new FormValidator(formParameters, formProfile);
profileFormValidator.enableValidation();

/** Добавляем валидацию для формы места */
const placeFormValidator = new FormValidator(formParameters, formPlace);
placeFormValidator.enableValidation();
