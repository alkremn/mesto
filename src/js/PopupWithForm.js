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
    return {
      firstInput: this._inputs[0].value,
      secondInput: this._inputs[1].value,
    };
  }

  setInputValues({ name, job }) {
    this._inputs[0].value = name;
    this._inputs[1].value = job;
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
    const form = this._popup.querySelector('.popup__form');
    form.reset();
    this._popupForm.removeEventListener('submit', this._handleSubmitClick);
    super.close();
  }
}
