import '../pages/index.css';
import { selectorNames, CARD_TEMPLATE_SELECTOR } from '../utils/constants.js';
import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// elements
const cardsList = document.querySelector('.cards__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Edit popup
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('input[name="name"]');
const jobInput = editPopup.querySelector('input[name="job"]');
const closeEditButton = editPopup.querySelector('.popup__close-button');

// Add card popup
const addPopup = document.querySelector('.popup_type_new-card');
const addForm = addPopup.querySelector('.popup__form');
const addCardTitleInput = addPopup.querySelector('input[name="title"]');
const addCardLinkInput = addPopup.querySelector('input[name="link"]');
const closeCardButton = addPopup.querySelector('.popup__close-button');

// Image popup
const imagePopup = document.querySelector('.popup_type_image');
const closeImageButton = imagePopup.querySelector('.popup__close-button');
const popupImage = imagePopup.querySelector('.popup__image');
const popupDescription = imagePopup.querySelector('.popup__caption');

// Form validators
const editFormValidator = new FormValidator(selectorNames, editForm);
const addCardFormValidator = new FormValidator(selectorNames, addForm);

// functions
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', handleCloseEvent);
  document.addEventListener('keydown', handleCloseEvent);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', handleCloseEvent);
  document.removeEventListener('keydown', handleCloseEvent);
}

function handlePreviewImage(name, link) {
  popupImage.alt = name;
  popupImage.src = link;
  popupDescription.textContent = name;
  openPopup(imagePopup);
}

function openAddCardPopup(popup) {
  addForm.reset();
  addCardFormValidator.resetValidation();
  openPopup(popup);
}

function openProfilePopup(popup) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.resetValidation();
  openPopup(popup);
}

function handleCloseEvent(evt) {
  if (evt.key === 'Escape' || evt.target.classList.contains('popup')) {
    const popupOpened = document.querySelector('.popup_opened');

    if (popupOpened) {
      closePopup(popupOpened);
    }
  }
}

// cards initialization
initialCards.forEach(data => {
  const card = new Card(data, CARD_TEMPLATE_SELECTOR, handlePreviewImage);
  cardsList.append(card.generateCard());
});

// Event Listeners
editButton.addEventListener('click', () => openProfilePopup(editPopup));
addButton.addEventListener('click', () => openAddCardPopup(addPopup));
closeImageButton.addEventListener('click', () => closePopup(imagePopup));
closeEditButton.addEventListener('click', () => closePopup(editPopup));
closeCardButton.addEventListener('click', () => closePopup(addPopup));

editForm.addEventListener('submit', e => {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
});

addForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  const newCard = new Card(
    { name, link },
    CARD_TEMPLATE_SELECTOR,
    handlePreviewImage
  );
  cardsList.prepend(newCard.generateCard());

  closePopup(addPopup);
});

// enabling form validations
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
