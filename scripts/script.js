function openPopup(popup) {
  inputName.focus();
  popup.classList.add("popup_active");
  popup.addEventListener("click", handleClosePopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  popup.removeEventListener("click", handleClosePopup);
}

function handleClosePopup(event) {
  const popupClose = event.target.closest(".popup");
  if (
    event.target.classList.contains("popup_active") ||
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
  closePopup(popupProfile);
}

formProfile.addEventListener("submit", handleSubmitForm);

// открытие попапа карточки места
profileAddBtn.addEventListener("click", () => {
  openPopup(popupPlace);
  inputPlace.value = "";
  inputLink.value = "";
});

//попап добавление карточки места
function handleAddCard(event) {
  event.preventDefault();
  closePopup(popupPlace);
  const card = { name: inputPlace.value, link: inputLink.value };
  renderCard(card);
  // formPlace.reset();
}

formPlace.addEventListener("submit", handleAddCard);

// генерируем карточку
function generateCard(item) {
  const newCard = galleryCard.cloneNode(true); // клонируем карточку
  const cardName = newCard.querySelector(".gallery__card-title");
  cardName.textContent = item.name;
  const cardLink = newCard.querySelector(".gallery__card-img");
  cardLink.src = item.link;
  cardName.alt = item.name;
  cardLink.addEventListener("click", (event) => {
    openPopup(popupPhoto);
    popupImg.src = item.link;
    popupImg.alt = item.name;
    popupImgTitle.textContent = item.name;
  });
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
