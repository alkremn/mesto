import { DELETING_TEXT } from '../utils/constants';
import Popup from './Popup';

export default class ConfirmPopup extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._confirmButton = this._popup.querySelector('.popup__button-confirm');
    this._defaultButtonText = this._confirmButton.textContent;
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
  }

  _handleConfirmClick() {
    this._handleDelete(this._card);
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', this._handleConfirmClick);
  }

  setData(card) {
    this._card = card;
  }

  setLoading(isLoading) {
    this._confirmButton.textContent = isLoading
      ? DELETING_TEXT
      : this._defaultButtonText;
  }
}
