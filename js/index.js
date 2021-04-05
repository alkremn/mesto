import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// elements
const pageElement = document.querySelector('.page');
const cardsList = document.querySelector('.cards__list');

const imagePopup = document.querySelector('.popup_type_image');

// Edit popup
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector('.popup__form');

//functions

// cards initialization
initialCards.forEach(data => {
  const card = new Card(data, '#card-template');
  cardsList.append(card.generateCard(imagePopup));
});

// event listeners
