class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._activePopupClass = 'popup_active';
    this._closeButtonClass = 'popup__close';
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
  }

  /** Функция окрытия попапа */
  open() {
    this._popup.classList.add(this._activePopupClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  /** Функция закрытия попапа */
  close() {
    this._popup.classList.remove(this._activePopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  /** Функция закрытия попапа по крестику и оверлею */
  _handleClosePopup(event) {
    if (
      event.target.classList.contains(this._activePopupClass) ||
      event.target.classList.contains(this._closeButtonClass)
    ) {
      // const popupClose = event.target.closest(this._popupSelector);
      this.close(this._popup);
    }
  }

  /** Функция закрытия попапа по esc */
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close(this._popup);
    }
  }

  /** Слушатель закрытия попапа */
  setEventListeners() {
    this._popup.addEventListener('click', (event) =>
      this._handleClosePopup(event)
    );
  }
}

export { Popup };
