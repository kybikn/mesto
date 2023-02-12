class Card {
  constructor(
    cardData,
    cardParameters,
    handleCardClick,
    apiCallbacks,
    confPopupCallbacks
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
    this._likesNumSelector = cardParameters.likesNumSelector;
    this._activeButtonClass = cardParameters.activeButtonClass;
    this._removeButtonSelector = cardParameters.removeButtonSelector;
    this._templateSelector = cardParameters.templateSelector;
    this._cardSelector = cardParameters.cardSelector;
    this._cardPopup = document.querySelector(cardParameters.cardPopupSelector);
    this._handleCardClick = handleCardClick;
    this._apiCallbacks = apiCallbacks;
    this._confPopupCallbacks = confPopupCallbacks;
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
    this._likesNum = this._newCard.querySelector(this._likesNumSelector);
  }

  /** Метод добавления данных */
  _setData() {
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
  }

  /** Метод удаления карточки */
  async _removeCard() {
    this._apiCallbacks
      .deleteCard(this._id)
      .then((json) => {
        if (json) {
          this._newCard.remove();
          this._newCard = null;
        }
      })
      .catch((err) => console.log(err));
  }

  /** Метод добавления лайка */
  _handleToggleLikeWithApi() {
    if (this._cardLike.classList.contains(this._activeButtonClass)) {
      this._apiCallbacks
        .deleteLike(this._id)
        .then((responseCardData) => {
          this._likes = responseCardData.likes;
          this._setLikes();
          this._handleDeleteLike();
        })
        .catch((err) => console.log(err));
    } else {
      this._apiCallbacks
        .addLike(this._id)
        .then((responseCardData) => {
          this._likes = responseCardData.likes;
          this._setLikes();
          this._handleAddLike();
        })
        .catch((err) => console.log(err));
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
      this._confPopupCallbacks.addNext(this._removeCard);
      this._confPopupCallbacks.open();
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
    this._setLikes();
    return this._newCard;
  }

  _setLikes() {
    const likesNum = this._likes.length;
    this._likesNum.textContent = likesNum;
  }
}

export { Card };
