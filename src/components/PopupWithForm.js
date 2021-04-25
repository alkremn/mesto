import { selectorNames } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._inputs = Array.from(
      this._popup.querySelectorAll(selectorNames.inputSelector)
    );
    this._popupForm = this._popup.querySelector(selectorNames.formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  _handleSubmitClick(e) {
    this._handleFormSubmit(e, this._getInputValues());
    this.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleSubmitClick);
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
