function openPopup(popup) {
  inputName.focus();
  popup.classList.add("popup_active");
  popupPlace.classList.add("popup-place_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  popupPlace.classList.remove("popup-place_active");
}

popup.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup_active") ||
    event.target.classList.contains("popup__close")
  ) {
    closePopup(popup);
  }
});

// открытие попапа профиля
profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  inputName.value = profileTitleName.textContent;
  inputJob.value = profileSubtitle.textContent;
});

//попап редактирование профиля
function handleSubmitForm(event) {
  event.preventDefault();
  profileTitleName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupProfile);
}
form.addEventListener("submit", handleSubmitForm);
