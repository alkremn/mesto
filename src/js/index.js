import '../pages/index.css';
import { selectorNames } from '../utils/constants.js';
import initialCards from './initial-cards.js';
import Section from './Section.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
import UserInfo from './UserInfo';
import FormValidator from './FormValidator.js';

const editButton = document.querySelector(selectorNames.editButtonSelector);
const addButton = document.querySelector(selectorNames.addButtonSelector);

const userInfo = new UserInfo({
  nameSelector: selectorNames.nameSelector,
  jobSelector: selectorNames.jobSelector,
});

const editFormValidator = new FormValidator(
  selectorNames,
  document
    .querySelector(selectorNames.editPopupSelector)
    .querySelector(selectorNames.formSelector)
);

const addCardFormValidator = new FormValidator(
  selectorNames,
  document
    .querySelector(selectorNames.addPopupSelector)
    .querySelector(selectorNames.formSelector)
);

function handleCardClick(name, link) {
  const popupImage = new PopupWithImage(selectorNames.imagePopupSelector);
  popupImage.open(name, link);
}

function createCardElement(item) {
  const card = new Card(
    item,
    selectorNames.cardTemplateSelector,
    handleCardClick
  );
  return card.generateCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: item => {
      section.addItem(createCardElement(item));
    },
  },
  selectorNames.cardsContainer
);

function handleEditFormSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values.firstInput, values.secondInput);
}

function handleAddFormSubmit(evt, values) {
  evt.preventDefault();
  const newCard = createCardElement({
    name: values.firstInput,
    link: values.secondInput,
  });
  section.prependItem(newCard);
}

editButton.addEventListener('click', () => {
  const editPopupForm = new PopupWithForm(
    selectorNames.editPopupSelector,
    handleEditFormSubmit
  );
  editPopupForm.setInputValues(userInfo.getUserInfo());
  editPopupForm.setEventListeners();

  editFormValidator.resetValidation();
  editFormValidator.enableValidation();

  editFormValidator.enableValidation();
  editPopupForm.open(userInfo.getUserInfo());
});

addButton.addEventListener('click', () => {
  const addPopupForm = new PopupWithForm(
    selectorNames.addPopupSelector,
    handleAddFormSubmit
  );

  addCardFormValidator.resetValidation();
  addCardFormValidator.enableValidation();

  addPopupForm.setEventListeners();
  addPopupForm.open();
});

section.renderElements();
