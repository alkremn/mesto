import { ERROR_MESSAGE } from '../utils/constants.js';

export default class FormValidator {
  constructor(selectorNames, formElement) {
    this._selectorNames = selectorNames;
    this._element = formElement;
    this._inputElements = Array.from(
      formElement.querySelectorAll(selectorNames.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      selectorNames.submitButtonSelector
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputElements.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._selectorNames.inputErrorClass);
    errorElement.classList.add(this._selectorNames.errorClass);

    if (inputElement.value.length !== 0) {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = ERROR_MESSAGE;
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._selectorNames.inputErrorClass);
    errorElement.classList.remove(this._selectorNames.errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(
        this._selectorNames.inactiveButtonClass
      );
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(
        this._selectorNames.inactiveButtonClass
      );
    }
  }

  _hasInvalidInput() {
    return this._inputElements.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  resetValidation() {
    this._inputElements.forEach(inputElement =>
      this._hideInputError(inputElement)
    );
    this._toggleButtonState();
  }

  enableValidation() {
    this.resetValidation();
    this._setEventListeners();
  }
}
