const buttonProfile = document.querySelector(".profile__title-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const profileTitleName = document.querySelector(".profile__title-name");
const profileSubtitle = document.querySelector(".profile__subtitle");

function togglePopup() {
  inputName.value = profileTitleName.textContent;
  inputJob.value = profileSubtitle.textContent;
  popup.classList.toggle("popup_active");
}

function closePopup(event) {
  if (
    event.target.classList.contains("popup_active") ||
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup__button")
  ) {
    popup.classList.remove("popup_active");
  }
}

function changeText() {
  profileTitleName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
}

buttonProfile.addEventListener("click", togglePopup);
popup.addEventListener("click", closePopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", changeText);
form.addEventListener("submit", formSubmitHandler);
