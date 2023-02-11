class Card {
  constructor(
    cardData,
    cardParameters,
    handleCardClick,
    api,
    confirmationPopup
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._likes = cardData.likes;
    this._like = cardData.like;
    this._isOwner = cardData.isOwner;
    this._imgSelector = cardParameters.imgSelector;
    this._titleSelector = cardParameters.titleSelector;
    this._likeButtonSelector = cardParameters.likeButtonSelector;
    this._activeButtonClass = cardParameters.activeButtonClass;
    this._removeButtonSelector = cardParameters.removeButtonSelector;
    this._templateSelector = cardParameters.templateSelector;
    this._cardSelector = cardParameters.cardSelector;
    this._cardPopup = document.querySelector(cardParameters.cardPopupSelector);
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._confirmationPopup = confirmationPopup;
    this._removeCard = this._removeCard.bind(this);
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
  async _removeCard() {
    // this._buttonRemove.src = '';
    const json = await this._api.deleteCard(this._id);
    if (json) {
      this._newCard.remove();
      this._newCard = null;
    }
  }

  /** Метод добавления лайка */
  _handleToggleLikeWithApi() {
    if (this._cardLike.classList.contains(this._activeButtonClass)) {
      this._api.deleteLike(this._id).then(() => this._handleDeleteLike());
    } else {
      this._api.addLike(this._id).then(() => this._handleAddLike());
    }
  }

  _handleAddLike() {
    this._cardLike.classList.add(this._activeButtonClass);
  }

  _handleDeleteLike() {
    this._cardLike.classList.remove(this._activeButtonClass);
  }

  /** Метод добавления слушателей событий */
  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      // this._confirmationPopup.addParams({
      //   removeCard: this._removeCard.bind.this,
      // });
      this._confirmationPopup.addNext(this._removeCard);
      this._confirmationPopup.open();
      // this._removeCard();
    });
    this._cardLike.addEventListener('click', () =>
      this._handleToggleLikeWithApi()
    );
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  /** Метод создания карточки */
  generateCard() {
    this._newCard = this._getTemplate();
    this._setElements();
    // ставим лайк, если он тобой поставлен
    if (this._like) {
      this._handleAddLike();
    }
    // Не отображаем иконку корзины (удаления карточки),
    // если не карточка не принадлежит пользователю.
    if (!this._isOwner) {
      this._buttonRemove.remove();
    }
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

export { Card };
