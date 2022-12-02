/** окрываем попап */
function openPopup(popup) {
  popup.classList.add("popup_active");
  popup.addEventListener("click", handleClosePopup);
  document.addEventListener("keydown", handleClosePopupEsc);
}

/** закрываем попап */
function closePopup(popup) {
  popup.classList.remove("popup_active");
  popup.removeEventListener("click", handleClosePopup);
  document.removeEventListener("keydown", handleClosePopupEsc);
}

/** закрываем попап по крестику и оверлею */
function handleClosePopup(event) {
  if (
    event.target.classList.contains("popup_active") ||
    event.target.classList.contains("popup__close")
  ) {
    const popupClose = event.target.closest(".popup");
    closePopup(popupClose);
  }
}

/** закрываем попап по esc */
function handleClosePopupEsc(event) {
  if (event.key === "Escape") {
    const popupCloseEsc = document.querySelector(".popup_active");
    closePopup(popupCloseEsc);
  }
}

/** добавляем value в попап профиля */
function addValuePopupProfile() {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}

/** попап редактирования профиля */
function handleChangeValuePopupProfile(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupProfile);
}

/** попап добавления карточки места */
function handleAddPlaceCard(event) {
  event.preventDefault();
  closePopup(popupPlace);
  const card = { name: inputPlace.value, link: inputLink.value };
  renderCard(card);
  formPlace.reset();
}

/** генерируем карточку */
function generateCard(item) {
  /** клонируем карточку */
  const newCard = card.cloneNode(true);
  const cardName = newCard.querySelector(".card__title");
  cardName.textContent = item.name;
  const cardLink = newCard.querySelector(".card__img");
  cardLink.src = item.link;
  cardName.alt = item.name;
  cardLink.addEventListener("click", () => openPopupPhoto(item));
  const cardLike = newCard.querySelector(".card__button-like");
  cardLike.addEventListener("click", handleAddLike);
  const buttonRemove = newCard.querySelector(".card__button-remove");
  buttonRemove.addEventListener("click", handleRemoveCard);
  return newCard;
}

/** проходим по массиву */
function render() {
  initialCards.forEach(renderCard);
}

/** добавляем карточку */
function renderCard(item) {
  galleryList.prepend(generateCard(item));
}
render();

/** добавляем лайк */
function handleAddLike(event) {
  event.target.classList.toggle("card__button-like_active");
}

/** удаляем карточку */
function handleRemoveCard(event) {
  event.target.closest(".card").remove();
}

/** открываем попап фото */
function openPopupPhoto(item) {
  popupImg.src = item.link;
  popupImg.alt = item.name;
  popupImgTitle.textContent = item.name;
  openPopup(popupPhoto);
}

/** открытие попапа профиля */
profileEditBtn.addEventListener("click", () => {
  addValuePopupProfile();
  openPopup(popupProfile);
  /** убираем ошибки при повторном открытии после стирания данных */
  const formElement = popupProfile.querySelector(formParameters.formSelector);
  checkFormValidity(formElement, formParameters);
});

/** открытие попапа карточки места */
profileAddBtn.addEventListener("click", () => {
  openPopup(popupPlace);
  /** делаем кнопку неактивной */
  const buttonElement = popupPlace.querySelector(
    formParameters.submitButtonSelector
  );
  buttonElement.classList.add(formParameters.inactiveButtonClass);
  buttonElement.disabled = true;
});

formProfile.addEventListener("submit", handleChangeValuePopupProfile);
formPlace.addEventListener("submit", handleAddPlaceCard);
