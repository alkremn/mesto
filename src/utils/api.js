export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.token;
    this.group_id = options.group_id;
  }

  _makeRequest(url) {
    return fetch(url, {
      headers: {
        authorization: this.token,
      },
    }).then(res => this._checkRequest(res));
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return this._makeRequest(`${this.baseUrl}/${this.group_id}/users/me`);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/${this.group_id}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, about }),
    }).then(res => this._checkRequest(res));
  }

  getInitialCards() {
    return this._makeRequest(`${this.baseUrl}/${this.group_id}/cards`);
  }

  postNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/${this.group_id}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, link }),
    }).then(res => this._checkRequest(res));
  }
  removeCard(cardId) {
    return fetch(`${this.baseUrl}/${this.group_id}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkRequest(res));
  }
}
