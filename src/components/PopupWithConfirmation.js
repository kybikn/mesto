import { Popup } from './Popup.js';

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler, formParameters) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(formParameters.formSelector);
  }

  addNext(next) {
    this.next = next;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(event, this.next);
    });
  }
}

export { PopupWithConfirmation };
