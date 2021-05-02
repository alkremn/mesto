import './index.css';
import { selectorNames, options } from '../utils/constants.js';
import Api from '../utils/api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ConfirmPopup from '../components/ConfirmPopup';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const editButton = document.querySelector(selectorNames.editButtonSelector);
const addButton = document.querySelector(selectorNames.addButtonSelector);
const deleteButton = document.querySelector(
  selectorNames.buttonConfirmSelector
);
const editAvatarButton = document.querySelector(
  selectorNames.editAvatarSelector
);
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');

const api = new Api(options);

api
  .getUserInfo()
  .then(userData => {
    userInfo.setUserInfo(userData);
  })
  .catch(error => console.log(error));

api
  .getInitialCards()
  .then(cards => {
    section.addItems(cards);
    section.renderElements();
  })
  .catch(error => console.log(error));

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

const deleteConfirmPopup = new ConfirmPopup(
  selectorNames.deletePopupSelector,
  handleCardDelete
);

const addPopupForm = new PopupWithForm(
  selectorNames.addPopupSelector,
  handleAddFormSubmit
);

const aditAvatarValidator = new FormValidator(
  selectorNames,
  document
    .querySelector(selectorNames.avatarEditPopupSelector)
    .querySelector(selectorNames.formSelector)
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

function handleCardDelete(e, cardId) {
  e.preventDefault();

  deleteConfirmPopup.setLoading(true);
  api
    .removeCard(cardId)
    .then(data => {
      section.removeItem(cardId);
      deleteConfirmPopup.setLoading(false);
      deleteConfirmPopup.close();
    })
    .catch(error => console.log(error));
}

function handleDeleteConfirm(cardId) {
  deleteConfirmPopup.setId(cardId);
  deleteConfirmPopup.open();
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
function handleEditAvatarSubmit(evt, { link }, closePopup) {
  evt.preventDefault();
  editAvatarForm.setLoading(true);
  api
    .updateAvatarLink(link)
    .then(data => {
      userInfo.setUserInfo(data);
      editAvatarForm.setLoading(false);
      closePopup();
    })
    .catch(error => console.log(error));
}

function handleEditFormSubmit(evt, values, closePopup) {
  evt.preventDefault();
  editPopupForm.setLoading(true);
  api
    .updateUserInfo(values)
    .then(data => {
      userInfo.setUserInfo(data);
      editPopupForm.setLoading(false);
      closePopup();
    })
    .catch(err => console.log(err));
}

function handleAddFormSubmit(evt, values, closePopup) {
  evt.preventDefault();
  addPopupForm.setLoading(true);
  api
    .postNewCard({ name: values.title, link: values.link })
    .then(card => {
      addPopupForm.setLoading(false);
      closePopup();
      if (section) {
        const card = createCardElement(card);
        section.addItem(card);
        section.prependItem(card);
      }
    })
    .catch(err => console.log(err));
}

// Event Listeners
editAvatarButton.addEventListener('click', () => {
  aditAvatarValidator.resetValidation();
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
deleteConfirmPopup.setEventListeners();
editPopupForm.setEventListeners();
addPopupForm.setEventListeners();

// Enable Validation
aditAvatarValidator.enableValidation();
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
