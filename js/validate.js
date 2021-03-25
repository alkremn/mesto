function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorNames.inputErrorClass);
  errorElement.classList.add(selectorNames.errorClass);
  if (inputElement.value.length !== 0) {
    errorElement.textContent = inputElement.validationMessage;
  } else {
    errorElement.textContent = ERROR_MESSAGE;
  }
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorNames.inputErrorClass);
  errorElement.classList.remove(selectorNames.errorClass);
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(selectorNames.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(selectorNames.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectorNames.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    selectorNames.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(selectorNames) {
  const formElements = Array.from(
    document.querySelectorAll(selectorNames.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

function hideFormErrors(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectorNames.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

enableValidation(selectorNames);
