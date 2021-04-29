import './index.css';
import { selectorNames, options } from '../utils/constants.js';
import Api from '../utils/api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const userInfo = new UserInfo({
  nameSelector: selectorNames.nameSelector,
  aboutSelector: selectorNames.aboutSelector,
  avatarSelector: selectorNames.avatarSelector,
});

const api = new Api(options);

api.getUserInfo().then(userData => {
  console.log(userData);
  userInfo.setUserInfo(userData);
});

api.getInitialCards().then(cards => {
  const section = new Section(
    {
      items: cards,
      renderer: item => {
        section.appendItem(createCardElement(item));
      },
    },
    selectorNames.cardsContainer
  );
  section.renderElements();
});

const editButton = document.querySelector(selectorNames.editButtonSelector);
const addButton = document.querySelector(selectorNames.addButtonSelector);
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');

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
  aboutInput.value = values.about;

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
