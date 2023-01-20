import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, formParameters) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(formParameters.formSelector);

    this._inputList = Array.from(
      this._form.querySelectorAll(formParameters.inputSelector)
    );
  }

  /**  Собирает данные всех полей формы */
  _getInputValues() {
    const formInputValues = {};
    this._inputList.forEach(
      (inputElement) =>
        (formInputValues[inputElement.name] = inputElement.value)
    );
    return formInputValues;
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) =>
      this._handleClosePopup(event)
    );
    this._popup.addEventListener("submit", this._submitHandler);
  }

  /**  Перезаписывает родительский метод close и сбрасывает форму */
  close() {
    super.close();
    this._form.reset();
  }
}

export { PopupWithForm };
