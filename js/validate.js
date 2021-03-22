const ERROR_MESSAGE = 'Вы пропустили это поле.';

function showInputError(formElement, inputElement, selectorNames) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorNames.inputErrorClass);
  errorElement.classList.add(selectorNames.errorClass);
  if (inputElement.value.length !== 0) {
    errorElement.textContent = inputElement.validationMessage;
  } else {
    errorElement.textContent = ERROR_MESSAGE;
  }
}

function hideInputError(formElement, inputElement, selectorNames) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorNames.inputErrorClass);
  errorElement.classList.remove(selectorNames.errorClass);
}

function checkInputValidity(formElement, inputElement, selectorNames) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, selectorNames);
  } else {
    hideInputError(formElement, inputElement, selectorNames);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function setEventListeners(formElement, selectorNames) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectorNames.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    selectorNames.submitButtonSelector
  );
  toggleButtonState(
    inputList,
    buttonElement,
    selectorNames.inactiveButtonClass
  );
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, selectorNames);
      toggleButtonState(
        inputList,
        buttonElement,
        selectorNames.inactiveButtonClass
      );
    });
  });
}

function enableValidation(selectorNames) {
  const formElements = Array.from(
    document.querySelectorAll(selectorNames.formSelector)
  );
  formElements.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectorNames);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
