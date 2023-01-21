import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, popupImgSelector, popupImgTitleSelector) {
    super(popupSelector);
    this._popupImg = document.querySelector(popupImgSelector);
    this._popupImgTitle = document.querySelector(popupImgTitleSelector);
  }

  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupImgTitle.textContent = name;
  }
}

export { PopupWithImage };
