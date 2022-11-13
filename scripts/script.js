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

// добавляем value в попап профиля
function addValuePopupProfile() {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
}

//попап редактирования профиля
function changeValuePopupProfile(event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupProfile);
}

//попап добавления карточки места
function addPlaceCard(event) {
  event.preventDefault();
  closePopup(popupPlace);
  const card = { name: inputPlace.value, link: inputLink.value };
  renderCard(card);
  formPlace.reset();
}

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

// проходим по массиву
function render() {
  initialCards.forEach(renderCard);
}

// добавляем карточку
function renderCard(item) {
  galleryList.prepend(generateCard(item));
}
render();

// добавляем лайк
function addLike(event) {
  event.target.classList.toggle("gallery__button-like_active");
}

// удаляем карточку
function removeCard(event) {
  event.target.closest(".gallery__card").remove();
}

// открытие попапа профиля
profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  addValuePopupProfile();
});

// открытие попапа карточки места
profileAddBtn.addEventListener("click", () => {
  openPopup(popupPlace);
});

formProfile.addEventListener("submit", changeValuePopupProfile);
formPlace.addEventListener("submit", addPlaceCard);
