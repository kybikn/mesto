import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
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
} from "./variables.js";
import {
  openPopup,
  closePopup,
  handleClosePopup,
  handleClosePopupEsc,
} from "./popup.js";

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
  openPopup(popupPlace);
  /** делаем кнопку неактивной */
  placeFormValidator.disableButton();
});

/** Функция прохождения по массиву карточек */
function render() {
  initialCards.forEach(renderCard);
}

/** Функция добавления карточки */
function renderCard(cardData) {
  const card = new Card(cardData, cardParameters);
  galleryList.prepend(card.getView());
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

export { openPopup, closePopup, handleClosePopup, handleClosePopupEsc };
