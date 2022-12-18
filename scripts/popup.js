import { popupParameters } from "./variables.js";

/** Функция окрытия попапа */
function openPopup(popup) {
  popup.classList.add(popupParameters.activePopupClass);
  popup.addEventListener("click", handleClosePopup);
  document.addEventListener("keydown", handleClosePopupEsc);
}

/** Функция закрытия попапа */
function closePopup(popup) {
  popup.classList.remove(popupParameters.activePopupClass);
  popup.removeEventListener("click", handleClosePopup);
  document.removeEventListener("keydown", handleClosePopupEsc);
}

/** Функция закрытия попапа по крестику и оверлею */
function handleClosePopup(event) {
  if (
    event.target.classList.contains(popupParameters.activePopupClass) ||
    event.target.classList.contains(popupParameters.closeButtonClass)
  ) {
    const popupClose = event.target.closest(popupParameters.popupSelector);
    closePopup(popupClose);
  }
}

/** Функция закрытия попапа по esc */
function handleClosePopupEsc(event) {
  if (event.key === "Escape") {
    const popupCloseEsc = document.querySelector(
      popupParameters.activePopupSelector
    );
    closePopup(popupCloseEsc);
  }
}

export { openPopup, closePopup, handleClosePopup, handleClosePopupEsc };
