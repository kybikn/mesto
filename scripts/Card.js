// Спасибо Вам большое за качественную проверку моей работы. Если у Вас есть еще советы и замечания - буду благодарна.

class Card {
  constructor(cardData, cardParameters, openPopup) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._imgSelector = cardParameters.imgSelector;
    this._titleSelector = cardParameters.titleSelector;
    this._likeButtonSelector = cardParameters.likeButtonSelector;
    this._activeButtonClass = cardParameters.activeButtonClass;
    this._removeButtonSelector = cardParameters.removeButtonSelector;
    this._templateSelector = cardParameters.templateSelector;
    this._cardSelector = cardParameters.cardSelector;
    this._cardPopup = document.querySelector(cardParameters.cardPopupSelector);
    this._popupImg = document.querySelector(cardParameters.popupImgSelector);
    this._popupImgTitle = document.querySelector(
      cardParameters.popupImgTitleSelector
    );
    // универсальная функция для открытия попапов
    this._openPopup = openPopup;
  }

  /** Метод генерации карточки */
  _getTemplate() {
    /** клонируем карточку */
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector);
    const card = cardTemplate.cloneNode(true);
    return card;
  }

  /** Метод нахождения элементов */
  _setElements() {
    this._cardName = this._newCard.querySelector(this._titleSelector);
    this._cardImage = this._newCard.querySelector(this._imgSelector);
    this._cardLike = this._newCard.querySelector(this._likeButtonSelector);
    this._buttonRemove = this._newCard.querySelector(
      this._removeButtonSelector
    );
  }

  /** Метод добавления данных */
  _setData() {
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
  }

  /** Метод удаления карточки */
  _removeCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  /** Метод добавления лайка */
  _handleAddLike() {
    this._cardLike.classList.toggle(this._activeButtonClass);
  }

  /** Метод добавления слушателей событий */
  _setEventListeners() {
    this._buttonRemove.addEventListener("click", () => this._removeCard());
    this._cardLike.addEventListener("click", () => this._handleAddLike());
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }

  /** Метод обработки клика на карточку для открытия попапа фото.
   * Он специфичный для карточки, поэтому является методом карточки.
   * Вызывает универсальную функцию openPopup, полученную в конструктор при вызове из index.js */
  _handleCardClick() {
    this._popupImg.src = this._link;
    this._popupImg.alt = this._name;
    this._popupImgTitle.textContent = this._name;
    this._openPopup(this._cardPopup);
  }

  /** Метод создания карточки */
  generateCard() {
    this._newCard = this._getTemplate();
    this._setElements();
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

export { Card };
