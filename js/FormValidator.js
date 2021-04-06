import { ERROR_MESSAGE } from '../utils/constants.js';

export default class FormValidator {
  constructor(selectorNames, formElement) {
    this._selectorNames = selectorNames;
    this._element = formElement;
    this._inputElements = Array.from(
      formElement.querySelectorAll(selectorNames.inputSelector)
    );
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners() {
    const buttonElement = this._element.querySelector(
      this._selectorNames.submitButtonSelector
    );

    this._toggleButtonState(this._inputElements, buttonElement);

    this._inputElements.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._element, inputElement);
        this._toggleButtonState(this._inputElements, buttonElement);
      });
    });
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._selectorNames.inputErrorClass);
    errorElement.classList.add(this._selectorNames.errorClass);

    if (inputElement.value.length !== 0) {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = ERROR_MESSAGE;
    }
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._selectorNames.inputErrorClass);
    errorElement.classList.remove(this._selectorNames.errorClass);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._selectorNames.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._selectorNames.inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation(formPopup) {
    this._inputElements.forEach(inputElement =>
      this._hideInputError(this._element, inputElement)
    );

    this._setEventListeners(formPopup);
  }
}