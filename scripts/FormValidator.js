class FormValidator {
  constructor(formParameters, formElement) {
    this._formSelector = formParameters.formSelector;
    this._inputSelector = formParameters.inputSelector;
    this._submitButtonSelector = formParameters.submitButtonSelector;
    this._inactiveButtonClass = formParameters.inactiveButtonClass;
    this._inputErrorClass = formParameters.inputErrorClass;
    this._formElement = formElement;

    this._inputList = Array.from(
      formElement.querySelectorAll(formParameters.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      formParameters.submitButtonSelector
    );
  }

  /** Метод проверки валидности поля и отображения ошибки в случае ее наличия */
  _checkInputValidity(inputElement) {
    /** если поле не проходит валидацию - */
    if (!inputElement.validity.valid) {
      /** покажем ошибку */
      this._showInputError(inputElement);
    } else {
      /** если проходит - скроем */
      this._hideInputError(inputElement);
    }
  }

  /** Метод проверки валидности формы и корректировки состояния инпутов и кнопки */
  checkFormValidity() {
    /** обходим все поля внутри формы */
    this._inputList.forEach((inputElement) => {
      /** проверяем валидность поля */
      this._checkInputValidity(inputElement);
    });
    /** проверяем состояние кнопки */
    this._toggleButtonState();
  }

  /** Метод очистки полей с ошибкой и дезактивации кнопки */
  resetValidation() {
    /** обходим все поля внутри формы */
    this._inputList.forEach((inputElement) => {
      /** делаем поля пустыми */
      inputElement.value = "";
      /** убираем ошибки */
      this._hideInputError(inputElement);
    });
    /** делаем кнопку неактивной */
    this.disableButton();
  }

  /** Метод добавления класса с ошибкой */
  _showInputError(inputElement) {
    /** добавляем инпуту класс ошибки */
    inputElement.classList.add(this._inputErrorClass);
    /** находим элемент для текста ошибки (span под инпутом) */
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    /** установим содержимое элемента для текста ошибки (span) на родное сообщение об ошибке для данного браузера */
    errorElement.textContent = inputElement.validationMessage;
    /** показываем сообщение об ошибке */
    errorElement.classList.add(this._inputErrorClass);
  }

  /** Метод удаления класса с ошибкой */
  _hideInputError(inputElement) {
    /** удаляем у инпута класс ошибки */
    inputElement.classList.remove(this._inputErrorClass);
    /** находим элемент для текста ошибки (span под инпутом) */
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    /** скрываем сообщение об ошибке */
    errorElement.classList.remove(this._inputErrorClass);
    /** очищаем ошибку */
    errorElement.textContent = "";
  }

  /** Метод проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита */
  _hasInvalidInput(inputList) {
    /** проходим по этому массиву методом some */
    return inputList.some((inputElement) => {
      /** если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true */
      return !inputElement.validity.valid;
    });
  }

  /** Метод переключения кнопки отправки */
  _toggleButtonState() {
    /** если есть хотя бы один невалидный инпут */
    if (this._hasInvalidInput(this._inputList)) {
      /** сделать кнопку неактивной */
      this.disableButton();
    } else {
      /** иначе сделать кнопку активной */
      this._enableButton();
    }
  }

  /** Метод блокировки кнопки отправки */
  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  /** Метод разблокировки кнопки отправки */
  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  /** Метод добавления слушателя событий всем полям ввода внутри формы */
  _setEventListeners() {
    /** проверяем состояние кнопки в самом начале */
    this._toggleButtonState();
    /** обходим все поля внутри формы */
    this._inputList.forEach((inputElement) => {
      /** каждому полю добавим обработчик события */
      inputElement.addEventListener("input", () => {
        /** проверяем валидность поля */
        this._checkInputValidity(inputElement);
        /** проверяем состояние кнопки */
        this._toggleButtonState();
      });

      /** находим крестик в поле */
      const cross = this._formElement.querySelector(
        `.${inputElement.id}-close`
      );
      /** каждому крестику добавим обработчик события */
      cross.addEventListener("click", () => {
        /** очищаем поле */
        inputElement.value = "";
        /** проверяем валидность поля */
        this._checkInputValidity(inputElement);
        /** проверяем состояние кнопки */
        this._toggleButtonState();
      });
    });
  }

  /** Вызов метода валидации всех форм */
  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
