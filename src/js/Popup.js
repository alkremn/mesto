import { ESC_CODE } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    //document.addEventListener('click', handleCloseEvent);
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    popup.classList.remove('popup_opened');
    //document.removeEventListener('click', handleCloseEvent);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose() {
    console.log(evt);
    if (evt.key === ESC_CODE) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', this.close);
  }
}
