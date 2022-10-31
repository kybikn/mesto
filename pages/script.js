const profileEditBtn = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const profileTitleName = document.querySelector(".profile__title-name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupCloseBtn = document.querySelector(".popup__close");

function togglePopup() {
  inputName.value = profileTitleName.textContent;
  inputJob.value = profileSubtitle.textContent;
  popup.classList.toggle("popup_active");
  inputName.focus();
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileTitleName.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  popup.classList.remove("popup_active");
}

profileEditBtn.addEventListener("click", togglePopup);
popupCloseBtn.addEventListener("click", togglePopup);
form.addEventListener("submit", formSubmitHandler);
