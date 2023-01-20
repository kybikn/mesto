class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._activePopupClass = "popup_active";
    this._closeButtonClass = "popup__close";
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
  }

  /** Функция окрытия попапа */
  open() {
    this._popup.classList.add(this._activePopupClass);
    this._popup.addEventListener("click", this._handleClosePopup);
    document.addEventListener("keydown", this._handleEscClose);
  }

  /** Функция закрытия попапа */
  close() {
    this._popup.classList.remove(this._activePopupClass);
    this._popup.removeEventListener("click", this._handleClosePopup);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  /** Функция закрытия попапа по крестику и оверлею */
  _handleClosePopup(event) {
    if (
      event.target.classList.contains(this._activePopupClass) ||
      event.target.classList.contains(this._closeButtonClass)
    ) {
      const popupClose = event.target.closest(this._popupSelector);
      this.close(popupClose);
    }
  }

  /** Функция закрытия попапа по esc */
  _handleEscClose(event) {
    if (event.key === "Escape") {
      const popupCloseEsc = document.querySelector(
        `.${this._activePopupClass}`
      );
      this.close(popupCloseEsc);
    }
  }

  /** Слушатель закрытия попапа */
  setEventListeners() {
    this._popup.addEventListener("click", (event) =>
      this._handleClosePopup(event)
    );
  }
}

export { Popup };
