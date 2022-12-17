import { openPopup } from "./index.js";
import {
  popupImg,
  popupImgTitle,
  popupPhoto,
  cardTemplate,
} from "./variables.js";

class Card {
  constructor(cardData, cardParameters) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._imgSelector = cardParameters.imgSelector;
    this._titleSelector = cardParameters.titleSelector;
    this._likeButtonSelector = cardParameters.likeButtonSelector;
    this._activeButtonClass = cardParameters.activeButtonClass;
    this._removeButtonSelector = cardParameters.removeButtonSelector;
  }

  /** Метод генерации карточки */
  _getTemplate() {
    /** клонируем карточку */
    const card = cardTemplate.cloneNode(true);
    return card;
  }

  /** Метод добавления данных */
  _setData() {
    const cardName = this._newCard.querySelector(this._titleSelector);
    cardName.textContent = this._name;
    const cardLink = this._newCard.querySelector(this._imgSelector);
    cardLink.src = this._link;
    cardLink.alt = this._link;
  }

  /** Метод удаления карточки */
  _removeCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  /** Метод добавления лайка */
  _handleAddLike() {
    const cardLike = this._newCard.querySelector(this._likeButtonSelector);
    cardLike.classList.toggle(this._activeButtonClass);
  }

  /** Метод добавления слушателей событий */
  _setEventListeners() {
    const buttonRemove = this._newCard.querySelector(
      this._removeButtonSelector
    );
    buttonRemove.addEventListener("click", () => this._removeCard());

    const cardLike = this._newCard.querySelector(this._likeButtonSelector);
    cardLike.addEventListener("click", () => this._handleAddLike());

    const openPopupPhoto = this._newCard.querySelector(this._imgSelector);
    openPopupPhoto.addEventListener("click", () => this._openPopupPhoto());
  }

  /** Метод открытия попапа фото */
  _openPopupPhoto() {
    popupImg.src = this._link;
    popupImg.alt = this._name;
    popupImgTitle.textContent = this._name;
    openPopup(popupPhoto);
  }

  /** Метод отображения карточки */
  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

export { Card };
