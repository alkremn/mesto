import { LOADING_TEXT } from '../utils/constants';
import Popup from './Popup';

export default class ConfirmPopup extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._confirmButton = this._popup.querySelector('.popup__button-confirm');
    this._defaultButtonText = this._confirmButton.textContent;
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
  }

  _handleConfirmClick(e) {
    this._handleDelete(e, this._id);
  }

  open() {
    this._confirmButton.addEventListener('click', this._handleConfirmClick);
    super.open();
  }

  close() {
    this._confirmButton.removeEventListener('click', this._handleConfirmClick);
    super.close();
  }

  setId(id) {
    this._id = id;
  }

  setLoading(isLoading) {
    console.log(this._confirmButton);
    this._confirmButton.textContent = isLoading
      ? LOADING_TEXT
      : this._defaultButtonText;
  }
}
