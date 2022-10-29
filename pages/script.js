const buttonProfile = document.querySelector(".profile__title-button");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input-name");
const inputJob = document.querySelector(".popup__input-job");
const profileTitleName = document.querySelector(".profile__title-name");
const profileSubtitle = document.querySelector(".profile__subtitle");

function togglePopup() {
  inputName.value = profileTitleName.textContent;
  inputJob.value = profileSubtitle.textContent;
  popup.classList.toggle("popup_active");
  inputName.focus();
}

function closePopup(event) {
  if (
    event.target.classList.contains("popup_active") ||
    event.target.classList.contains("popup__close")
  ) {
    popup.classList.remove("popup_active");
  }
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileTitleName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  popup.classList.remove("popup_active");
}

buttonProfile.addEventListener("click", togglePopup);
popup.addEventListener("click", closePopup);
form.addEventListener("submit", formSubmitHandler);
