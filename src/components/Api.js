class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._profileUrl = `${baseUrl}/users/me`;
    this._cardsUrl = `${baseUrl}/cards`;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        `Ошибка: ${response.status} ${response.statusText}`
      );
    }
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
      method: 'GET',
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }

  getProfile() {
    return fetch(this._profileUrl, {
      headers: this._headers,
      method: 'GET',
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }

  editProfile({ userName, userJob }) {
    return fetch(this._profileUrl, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }

  editAvatar(link) {
    const avatarUrl = `${this._profileUrl}/avatar`;
    return fetch(avatarUrl, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }

  addNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }

  deleteCard(cardId) {
    const deleteCardsUrl = `${this._cardsUrl}/${cardId}`;
    return fetch(deleteCardsUrl, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }

  addLike(cardId) {
    const likeCardsUrl = `${this._cardsUrl}/${cardId}/likes`;
    console.log('this._cardsUrl:', this._cardsUrl);
    console.log('likeCardsUrl:', likeCardsUrl);
    return fetch(likeCardsUrl, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }

  deleteLike(cardId) {
    const likeCardsUrl = `${this._cardsUrl}/${cardId}/likes`;
    console.log('likeCardsUrl:', likeCardsUrl);
    return fetch(likeCardsUrl, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._handleResponse)
      .catch((error) => console.log(error));
  }
}

export { Api };
