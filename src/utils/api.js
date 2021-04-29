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
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._makeRequest(`${this.baseUrl}/${this.group_id}/users/me`);
  }

  getInitialCards() {
    return this._makeRequest(`${this.baseUrl}/${this.group_id}/cards`);
  }

  updateUserInfo({ name, about }) {
    fetch(`${this.baseUrl}/${this.group_id}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, about }),
    });
  }
}
