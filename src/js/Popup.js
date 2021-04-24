import { ESC_CODE } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleCloseEvent = this._handleCloseEvent.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('click', this._handleCloseEvent);
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleCloseEvent);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleCloseEvent(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.keyCode === ESC_CODE) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', this.close);
  }
}
