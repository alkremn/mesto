import './index.css';
import { selectorNames, options } from '../utils/constants.js';
import Api from '../utils/api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const editButton = document.querySelector(selectorNames.editButtonSelector);
const addButton = document.querySelector(selectorNames.addButtonSelector);
const editAvatarButton = document.querySelector(
  selectorNames.editAvatarSelector
);
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');

const api = new Api(options);

api.getUserInfo().then(userData => {
  userInfo.setUserInfo(userData);
});

api.getInitialCards().then(cards => {
  section.addItems(cards);
  section.renderElements();
});

const userInfo = new UserInfo({
  nameSelector: selectorNames.nameSelector,
  aboutSelector: selectorNames.aboutSelector,
  avatarSelector: selectorNames.avatarSelector,
});

const section = new Section(
  {
    items: null,
    renderer: item => {
      section.appendItem(createCardElement(item));
    },
  },
  selectorNames.cardsContainer
);

const popupImage = new PopupWithImage(selectorNames.imagePopupSelector);

const editAvatarForm = new PopupWithForm(
  selectorNames.avatarEditPopupSelector,
  handleEditAvatarSubmit
);

const editPopupForm = new PopupWithForm(
  selectorNames.editPopupSelector,
  handleEditFormSubmit
);

const deleteConfirmForm = new PopupWithForm(
  selectorNames.deletePopupSelector,
  handleDeleteCard
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

function handleDeleteCard(e, cardId) {
  e.preventDefault();
  console.log(cardId);
}

function handleDeleteConfirm(e, cardId) {
  deleteConfirmForm.open();
  // api.removeCard(cardId).then(data => console.log(data));
  //e.target.closest('.card').remove();
}

function createCardElement(item) {
  const card = new Card(
    item,
    selectorNames.cardTemplateSelector,
    handleCardClick,
    handleDeleteConfirm
  );
  return card.generateCard(userInfo._id, item.owner._id);
}

// Submit functions
function handleEditAvatarSubmit(evt, values) {}

function handleEditFormSubmit(evt, values) {
  evt.preventDefault();
  api
    .updateUserInfo(values)
    .then(data => userInfo.setUserInfo(data))
    .catch(err => console.log(err));
}

function handleAddFormSubmit(evt, values) {
  evt.preventDefault();
  api
    .postNewCard({ name: values.title, link: values.link })
    .then(card => {
      if (section) {
        section.prependItem(createCardElement(card));
      }
    })
    .catch(err => console.log(err));
}

// Event Listeners
editAvatarButton.addEventListener('click', () => {
  editAvatarForm.open();
});

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

editAvatarForm.setEventListeners();
popupImage.setEventListeners();
deleteConfirmForm.setEventListeners();
editPopupForm.setEventListeners();
addPopupForm.setEventListeners();

// Enable Validation
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
