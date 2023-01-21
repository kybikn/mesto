import { Popup } from './Popup.js';

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

  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      inputElement.value = data[inputElement.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      const inputValues = this._getInputValues();
      this._submitHandler(event, inputValues);
    });
  }

  /**  Перезаписывает родительский метод close и сбрасывает форму */
  close() {
    super.close();
    this._form.reset();
  }
}

export { PopupWithForm };
