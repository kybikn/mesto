/**
 * Функция валидации всех форм
 * @constructor
 * @param {Object} formParameters - объект с данными о форме
 */
function enableValidation(formParameters) {
  /** Находим все формы с указанным классом в DOM, сделаем из них массив методом Array.from */
  const formList = Array.from(
    document.querySelectorAll(formParameters.formSelector)
  );
  /** Переберём полученную коллекцию */
  formList.forEach((formElement) => {
    setEventListeners(formElement, formParameters);
  });
}

/**
 * Функция добавления слушателя событий всем полям ввода внутри формы
 * @constructor
 * @param {HTMLFormElement} formElement - форма
 * @param {Object} formParameters - объект с данными о форме
 */
function setEventListeners(formElement, formParameters) {
  /** Находим все поля внутри формы, сделаем из них массив методом Array.from */
  const inputList = Array.from(
    formElement.querySelectorAll(formParameters.inputSelector)
  );
  /** Найдём в текущей форме кнопку отправки */
  const buttonElement = formElement.querySelector(
    formParameters.submitButtonSelector
  );
  /** Вызовем toggleButtonState, чтобы не ждать ввода данных в поля и проверить состояние кнопки в самом начале */
  toggleButtonState(inputList, buttonElement, formParameters);
  /** Обойдём все элементы полученной коллекции */
  inputList.forEach((inputElement) => {
    /** Каждому полю добавим обработчик события */
    inputElement.addEventListener("input", () => {
      /** Вызовем функцию checkInputValidity, передав ей форму и проверяемый элемент */
      checkInputValidity(formElement, inputElement, formParameters);
      /** Вызовем toggleButtonState, передав ей массив полей и кнопку, чтобы проверять его при изменении любого из полей */
      toggleButtonState(inputList, buttonElement, formParameters);
    });
    /** Находим крестик */
    const cross = formElement.querySelector(`.${inputElement.id}-close`);
    /** Каждому крестику добавим обработчик события */
    cross.addEventListener("click", () => {
      /** делаем поле пустым */
      inputElement.value = "";
      /** Вызовем функцию checkInputValidity, передав ей форму и проверяемый элемент */
      checkInputValidity(formElement, inputElement, formParameters);
      /** Вызовем toggleButtonState, передав ей массив полей и кнопку, чтобы проверять его при изменении любого из полей */
      toggleButtonState(inputList, buttonElement, formParameters);
    });
  });
}

/**
 * Функция добавления класса с ошибкой
 * @constructor
 * @param {HTMLFormElement} formElement - форма
 * @param {HTMLInputElement} inputElement - инпут
 * @param {Object} formParameters - объект с данными о форме
 */
function showInputError(formElement, inputElement, formParameters) {
  /** Добавляем инпуту класс ошибки */
  inputElement.classList.add(formParameters.inputErrorClass);
  /** Находим элемент для текста ошибки (span под инпутом) */
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  /** Установим содержимое элемента для текста ошибки (span) на родное сообщение об ошибке для данного браузера. validationMessage - это свойство самого инпута (https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#validating_forms_using_javascript) */
  errorElement.textContent = inputElement.validationMessage;
  /** Показываем сообщение об ошибке */
  errorElement.classList.add(formParameters.inputErrorClass);
}

/**
 * Функция удаления класса с ошибкой
 * @constructor
 * @param {HTMLFormElement} formElement - форма
 * @param {HTMLInputElement} inputElement - инпут
 * @param {Object} formParameters - объект с данными о форме
 */
function hideInputError(formElement, inputElement, formParameters) {
  /** Удаляем у инпута класс ошибки */
  inputElement.classList.remove(formParameters.inputErrorClass);
  /** Находим элемент для текста ошибки (span под инпутом) */
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  /** Скрываем сообщение об ошибке */
  errorElement.classList.remove(formParameters.inputErrorClass);
  /** Очистим ошибку */
  errorElement.textContent = "";
}

/**
 * Функция проверки валидности поля и отображения ошибки в случае ее наличия
 * @constructor
 * @param {HTMLFormElement} formElement - форма
 * @param {HTMLInputElement} inputElement - инпут
 * @param {Object} formParameters - объект с данными о форме
 */
function checkInputValidity(formElement, inputElement, formParameters) {
  if (!inputElement.validity.valid) {
    /** Если поле не проходит валидацию, покажем ошибку */
    showInputError(formElement, inputElement, formParameters);
  } else {
    /** Если проходит, скроем */
    hideInputError(formElement, inputElement, formParameters);
  }
}

/**
 * Функция проверки валидности формы и корректировки состояния инпутов и кнопки
 * @constructor
 * @param {HTMLFormElement} formElement - форма
 * @param {Object} formParameters - объект с данными о форме
 */
function checkFormValidity(formElement, formParameters) {
  /** Находим все поля внутри формы, сделаем из них массив методом Array.from */
  const inputList = Array.from(
    formElement.querySelectorAll(formParameters.inputSelector)
  );
  /** Найдём в текущей форме кнопку отправки */
  const buttonElement = formElement.querySelector(
    formParameters.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    /** Вызовем функцию checkInputValidity, передав ей форму и проверяемый элемент */
    checkInputValidity(formElement, inputElement, formParameters);
  });
  /** Вызовем toggleButtonState, передав ей массив полей и кнопку */
  toggleButtonState(inputList, buttonElement, formParameters);
}

/**
 * Функция проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
 * @constructor
 * @param {HTMLInputElement} inputList - массив полей
 */
function hasInvalidInput(inputList) {
  /** проходим по этому массиву методом some */
  return inputList.some((inputElement) => {
    /** Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true */
    return !inputElement.validity.valid;
  });
}

/**
 * Функция блокировки кнопки отправки
 * @constructor
 * @param {array} inputList - массив полей
 * @param {HTMLButtonElement} buttonElement - кнопка отправки
 * @param {Object} formParameters - обьект с данными о форме
 */
function toggleButtonState(inputList, buttonElement, formParameters) {
  /** Если есть хотя бы один невалидный инпут */
  if (hasInvalidInput(inputList)) {
    /** сделай кнопку неактивной */
    buttonElement.classList.add(formParameters.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    /** иначе сделай кнопку активной */
    buttonElement.classList.remove(formParameters.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

/** вызов функция валидации всех форм */
enableValidation(formParameters);
