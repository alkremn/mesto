export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.token;
    this.group_id = options.group_id;
  }

  _makeRequest(url, method, body) {
    return fetch(url, {
      method,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body,
    }).then(res => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return this._makeRequest(
      `${this.baseUrl}/${this.group_id}/users/me`,
      'GET'
    );
  }

  updateUserInfo({ name, about }) {
    return this._makeRequest(
      `${this.baseUrl}/${this.group_id}/users/me`,
      'PATCH',
      JSON.stringify({ name, about })
    );
  }

  updateAvatarLink(link) {
    return this._makeRequest(
      `${this.baseUrl}/${this.group_id}/users/me/avatar`,
      'PATCH',
      JSON.stringify({ avatar: link })
    );
  }

  getInitialCards() {
    return this._makeRequest(`${this.baseUrl}/${this.group_id}/cards`);
  }

  postNewCard({ name, link }) {
    return this._makeRequest(
      `${this.baseUrl}/${this.group_id}/cards`,
      'POST',
      JSON.stringify({ name, link })
    );
  }
  removeCard(cardId) {
    return this._makeRequest(
      `${this.baseUrl}/${this.group_id}/cards/${cardId}`,
      'DELETE'
    );
  }
  addCardLike(cardId) {
    return this._makeRequest(
      `${this.baseUrl}/${this.group_id}/cards/likes/${cardId}`,
      'PUT'
    );
  }
  removeCardLike(cardId) {
    return this._makeRequest(
      `${this.baseUrl}/${this.group_id}/cards/likes/${cardId}`,
      'DELETE'
    );
  }
}
