const pageElement = document.querySelector(".page");
const cardsList = document.querySelector(".cards__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// edit profile popup
const editPopup = document.querySelector(".popup_type_edit");
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editPopup.querySelector('input[name="name"]');
const jobInput = editPopup.querySelector('input[name="job"]');
const editSaveButton = editPopup.querySelector(".popup__button");
const closeEditButton = editPopup.querySelector(".popup__close-button");

// Add card popup
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = addPopup.querySelector(".popup__form");
const addCardTitleInput = addPopup.querySelector('input[name="title"]');
const addCardLinkInput = addPopup.querySelector('input[name="link"]');
const closeCardButton = addPopup.querySelector(".popup__close-button");

// image popup
const imagePopup = document.querySelector(".popup_type_image");
const image = imagePopup.querySelector(".popup__image");
const description = imagePopup.querySelector(".popup__caption");
const closeImageButton = imagePopup.querySelector(".popup__close-button");

// card template
const cardTemplate = document.querySelector("#card-template").content;
const card = cardTemplate.querySelector(".card");

//functions
function renderInitialCards() {
  const cards = initialCards.map(createCard);
  cardsList.append(...cards);
}

function clearFormFieldValues(formElement) {
  formElement.reset();
  hideFormErrors(formElement);
  const submitButton = formElement.querySelector(".popup__button");
  submitButton.setAttribute("disabled", true);
  submitButton.classList.add(selectorNames.inactiveButtonClass);
}

function handleClosePopup(popup) {
  const formElement = popup.querySelector(".popup__form");
  if (formElement) {
    clearFormFieldValues(formElement);
  }
  closePopup(popup);
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    if (popupOpened) {
      handleClosePopup(popupOpened);
    }
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleLikeIcon(likeButton) {
  likeButton.classList.toggle("card__like-button_active");
}

function handleDeleteCard(e) {
  e.target.closest(".card").remove();
}

function handlePreviewImage(item) {
  image.alt = item.name;
  image.src = item.link;
  description.textContent = item.name;
  openPopup(imagePopup);
}

function setFormFieldValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editSaveButton.removeAttribute("disabled");
  editSaveButton.classList.remove(selectorNames.inactiveButtonClass);
  openPopup(editPopup);
}

function createCard(item) {
  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", (e) => handleDeleteCard(e));
  likeButton.addEventListener("click", () => handleLikeIcon(likeButton));
  cardImage.addEventListener("click", () => handlePreviewImage(item));

  return newCard;
}

// Listeners
pageElement.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    handleClosePopup(evt.target);
  }
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClosePopup(editPopup);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  if (name && link) {
    const card = createCard({ name, link });
    cardsList.prepend(card);
  }
  handleClosePopup(addPopup);
});

editButton.addEventListener("click", setFormFieldValues);
addButton.addEventListener("click", () => openPopup(addPopup));
closeEditButton.addEventListener("click", () => handleClosePopup(editPopup));
closeCardButton.addEventListener("click", () => handleClosePopup(addPopup));
closeImageButton.addEventListener("click", () => closePopup(imagePopup));

// Render cards
renderInitialCards();
