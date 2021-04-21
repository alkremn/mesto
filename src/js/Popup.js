import { ESC_CODE } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    popup.classList.add('popup_opened');
    document.addEventListener('click', handleCloseEvent);
    document.addEventListener('keydown', handleCloseEvent);
  }
  close() {}

  _handleEscClose() {
    if (evt.key === ESC_CODE || evt.target.classList.contains('popup')) {
      const popupOpened = document.querySelector('.popup_opened');

      if (popupOpened) {
        closePopup(popupOpened);
      }
    }
  }
}
