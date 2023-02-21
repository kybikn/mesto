class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._profileUrl = `${baseUrl}/users/me`;
    this._cardsUrl = `${baseUrl}/cards`;
  }

  // обработчик ответа от сервера
  _handleResponse(response) {
    if (response.ok) {
      // парсит json файл и возвращает js обьект
      return response.json();
    } else {
      // возвращает reject ошибку
      return Promise.reject(
        `Ошибка: ${response.status} ${response.statusText}`
      );
    }
  }

  // получение данных карточек
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
      method: 'GET',
    }).then(this._handleResponse);
  }

  // получение профиля пользователя
  getProfile() {
    return fetch(this._profileUrl, {
      headers: this._headers,
      method: 'GET',
    }).then(this._handleResponse);
  }

  // редактирование профиля пользователя
  editProfile({ userName, userJob }) {
    return fetch(this._profileUrl, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    }).then(this._handleResponse);
  }

  // редактирование аватара пользователя
  editAvatar(link) {
    const avatarUrl = `${this._profileUrl}/avatar`;
    return fetch(avatarUrl, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleResponse);
  }

  // добавление новой карточки
  addNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    const deleteCardsUrl = `${this._cardsUrl}/${cardId}`;
    return fetch(deleteCardsUrl, {
      headers: this._headers,
      method: 'DELETE',
    }).then(this._handleResponse);
  }

  // добавление лайка
  addLike(cardId) {
    const likeCardsUrl = `${this._cardsUrl}/${cardId}/likes`;
    return fetch(likeCardsUrl, {
      headers: this._headers,
      method: 'PUT',
    }).then(this._handleResponse);
  }

  // удаление лайка
  deleteLike(cardId) {
    const likeCardsUrl = `${this._cardsUrl}/${cardId}/likes`;
    console.log('likeCardsUrl:', likeCardsUrl);
    return fetch(likeCardsUrl, {
      headers: this._headers,
      method: 'DELETE',
    }).then(this._handleResponse);
  }
}

export { Api };
