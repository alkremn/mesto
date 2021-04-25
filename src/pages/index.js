import './index.css';
import { selectorNames } from '../utils/constants.js';
import initialCards from '../js/initial-cards.js';
import Section from '../js/Section.js';
import Card from '../js/Card.js';
import PopupWithImage from '../js/PopupWithImage.js';
import PopupWithForm from '../js/PopupWithForm.js';
import UserInfo from '../js/UserInfo.js';
import FormValidator from '../js/FormValidator.js';

const editButton = document.querySelector(selectorNames.editButtonSelector);
const addButton = document.querySelector(selectorNames.addButtonSelector);
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');

const userInfo = new UserInfo({
  nameSelector: selectorNames.nameSelector,
  jobSelector: selectorNames.jobSelector,
});

const popupImage = new PopupWithImage(selectorNames.imagePopupSelector);

const editPopupForm = new PopupWithForm(
  selectorNames.editPopupSelector,
  handleEditFormSubmit
);

const addPopupForm = new PopupWithForm(
  selectorNames.addPopupSelector,
  handleAddFormSubmit
);

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

const section = new Section(
  {
    items: initialCards,
    renderer: item => {
      section.appendItem(createCardElement(item));
    },
  },
  selectorNames.cardsContainer
);

// Functions
function handleCardClick(name, link) {
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

function handleEditFormSubmit(evt, values) {
  evt.preventDefault();
  userInfo.setUserInfo(values);
}

function handleAddFormSubmit(evt, values) {
  evt.preventDefault();
  const newCard = createCardElement({
    name: values.title,
    link: values.link,
  });
  section.prependItem(newCard);
}

// Event Listeners
editButton.addEventListener('click', () => {
  const values = userInfo.getUserInfo();
  nameInput.value = values.name;
  jobInput.value = values.job;

  editFormValidator.resetValidation();
  editPopupForm.open();
});

addButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addPopupForm.open();
});

popupImage.setEventListeners();

editPopupForm.setEventListeners();
editFormValidator.enableValidation();

addPopupForm.setEventListeners();
addCardFormValidator.enableValidation();

section.renderElements();
