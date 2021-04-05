import { selectorNames, CARD_TEMPLATE_SELECTOR } from "../utils/constants.js";
import initialCards from "./initial-cards.js";
import Card from "./Card.js";
//import FormValidator from "./FormValidator.js";

// elements
const cardsList = document.querySelector(".cards__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const imagePopup = document.querySelector(".popup_type_image");
const closeImageButton = imagePopup.querySelector(".popup__close-button");

// Edit popup
const editPopup = document.querySelector(".popup_type_edit");
const editForm = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Add card popup
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = addPopup.querySelector(".popup__form");
const addCardTitleInput = addPopup.querySelector('input[name="title"]');
const addCardLinkInput = addPopup.querySelector('input[name="link"]');

// const editFormValidator = new FormValidator(selectorNames, editForm);
// const addCardFormValidator = new FormValidator(selectorNames, addForm);

// functions
function handlePopupOpen(popup) {
  // if (popup.classList.contains("popup_type_edit")) {
  //   editFormValidator.enableValidation(editPopup, profileName, profileJob);
  // } else {
  //   addCardFormValidator.enableValidation(addPopup);
  // }
  popup.classList.add("popup_opened");
  document.addEventListener("click", handleCloseEvent);
  document.addEventListener("keydown", handleCloseEvent);
}

function handleClosePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("click", handleCloseEvent);
  document.removeEventListener("keydown", handleCloseEvent);
}

function handleCloseEvent(evt) {
  if (evt.key === "Escape" || evt.target.classList.contains("popup")) {
    const popupOpened = document.querySelector(".popup_opened");
    if (popupOpened) {
      handleClosePopup(popupOpened);
    }
  }
}

// cards initialization
initialCards.forEach((data) => {
  const card = new Card(data, CARD_TEMPLATE_SELECTOR);
  cardsList.append(card.generateCard(imagePopup, handlePopupOpen));
});

// Event Listeners
editButton.addEventListener("click", () => handlePopupOpen(editPopup));
addButton.addEventListener("click", () => handlePopupOpen(addPopup));
closeImageButton.addEventListener("click", () => handleClosePopup(imagePopup));

// editForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   handleClosePopup(editPopup);
// });

// addForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log(e);
//   const name = addCardTitleInput.value;
//   const link = addCardLinkInput.value;
//   if (name && link) {
//     cardsList.prepend(
//       new Card({ name, link }, CARD_TEMPLATE_SELECTOR).generateCard(
//         imagePopup,
//         handlePopupOpen
//       )
//     );
//   }
//   handleClosePopup(addForm);
// });
