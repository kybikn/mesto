import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(popupImg, popupImgTitle, name, link) {
    super.open();
    popupImg.src = link;
    popupImg.alt = name;
    popupImgTitle.textContent = name;
    // this._popup.classList.add(this._activePopupClass);
    // this._popup.addEventListener("click", this._handleClosePopup);
    // document.addEventListener("keydown", this._handleEscClose);
  }
}

export { PopupWithImage };
