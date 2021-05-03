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
    this._handleDelete(this._card, this._id);
  }

  open() {
    this._confirmButton.addEventListener('click', this._handleConfirmClick);
    super.open();
  }

  close() {
    this._confirmButton.removeEventListener('click', this._handleConfirmClick);
    super.close();
  }

  setData(card, id) {
    this._card = card;
    this._id = id;
  }

  setLoading(isLoading) {
    this._confirmButton.textContent = isLoading
      ? DELETING_TEXT
      : this._defaultButtonText;
  }
}
