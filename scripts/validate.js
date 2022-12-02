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

/** вызов функция валидации всех форм */
enableValidation(formParameters);
