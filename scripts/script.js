function openPopup(popup) {
  inputName.focus();
  popup.classList.add("popup_active");
  popup.classList.add("popup-place_active");
  popup.addEventListener("click", handleClosePopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  popup.classList.remove("popup-place_active");
  popup.removeEventListener("click", handleClosePopup);
}

function handleClosePopup(event) {
  const popupClose = event.target.closest(".popup");
  if (
    event.target.classList.contains("popup_active") ||
    event.target.classList.contains("popup-place_active") ||
    event.target.classList.contains("popup__close")
  ) {
    closePopup(popupClose);
  }
}

// открытие попапа профиля
profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
});

//попап редактирование профиля
function handleSubmitForm(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
}
formProfile.addEventListener("submit", handleSubmitForm);

// генерируем карточку
function generateCard(item) {
  const newCard = galleryCard.cloneNode(true); // клонируем карточку
  const cardName = newCard.querySelector(".gallery__card-title");
  cardName.textContent = item.name;
  // cardName.addEventListener("click", openPopupPhoto);
  const cardLink = newCard.querySelector(".gallery__card-img");
  cardLink.src = item.link;
  cardName.alt = item.name;
  const cardLike = newCard.querySelector(".gallery__button-like");
  cardLike.addEventListener("click", addLike);
  const buttonRemove = newCard.querySelector(".gallery__button-remove");
  buttonRemove.addEventListener("click", removeCard);
  return newCard;
}

// добавляем карточку
function renderCard(item) {
  galleryList.prepend(generateCard(item));
}

// добавляем лайк
function addLike(event) {
  event.target.classList.toggle("gallery__button-like_active");
}

// удаляем карточку
function removeCard(event) {
  event.target.closest(".gallery__card").remove();
}

// проходим по массиву
initialCards.forEach((item) => renderCard(item));
