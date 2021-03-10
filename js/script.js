const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const EDIT_TITLE = 'Редактировать профиль';
const ADD_TITLE = 'Новое место';

window.onload = () => {
  const cards = initialCards.map(card => {
    return createCardElement(card);
  });

  elementsList.append(...cards);
};

const elementsList = document.querySelector('.elements__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');

editButton.addEventListener('click', () => {
  const formTemplate = document.querySelector('#form-template').content;
  const editForm = formTemplate
    .querySelector('.popup__container')
    .cloneNode(true);

  editForm.name = 'profile-form';
  editForm
    .querySelector('.popup__close-button')
    .addEventListener('click', handlePopupClose);
  editForm
    .querySelector('.popup__save-button')
    .addEventListener('click', e => handlePopupSave(e, editForm.name));

  const popupTitle = editForm.querySelector('.popup__title');
  popupTitle.textContent = EDIT_TITLE;
  const inputs = editForm.querySelectorAll('.popup__input');

  inputs[0].name = 'profileName';
  inputs[0].value = profileName.textContent;

  inputs[1].name = 'profileJob';
  inputs[1].value = profileJob.textContent;

  popup.appendChild(editForm);
  document.body.style.overflow = 'hidden';
  popup.classList.add('popup_opened');
});

addButton.addEventListener('click', () => {
  const formTemplate = document.querySelector('#form-template').content;
  const addForm = formTemplate
    .querySelector('.popup__container')
    .cloneNode(true);

  addForm.name = 'add-form';
  addForm
    .querySelector('.popup__close-button')
    .addEventListener('click', handlePopupClose);

  const saveButton = addForm.querySelector('.popup__save-button');
  saveButton.textContent = 'Создать';
  saveButton.addEventListener('click', e => handlePopupSave(e, addForm.name));

  const popupTitle = addForm.querySelector('.popup__title');
  popupTitle.textContent = ADD_TITLE;

  const inputs = addForm.querySelectorAll('.popup__input');
  inputs[0].placeholder = 'Название';
  inputs[0].name = 'placeName';
  inputs[1].placeholder = 'Ссылка на картинку';
  inputs[1].name = 'placeLink';

  popup.appendChild(addForm);
  document.body.style.overflow = 'hidden';
  popup.classList.add('popup_opened');
});

popup.addEventListener('click', e => {
  if (e.target.className === 'popup popup_opened') {
    handlePopupClose();
  }
});

const handlePopupSave = (e, formName) => {
  e.preventDefault();
  if (formName === 'profile-form') {
    handleProfileSave();
  } else {
    handleCardSave();
  }
  handlePopupClose();
};

const handlePopupClose = () => {
  popup.classList.remove('popup_opened');
  const child = popup.children[0];
  popup.removeChild(child);
  document.body.style.overflow = 'auto';
};

const handleProfileSave = () => {
  const nameInput = document.querySelector('input[name="profileName"]');
  const jobInput = document.querySelector('input[name="profileJob"]');
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
};

const handleCardSave = () => {
  const nameInput = document.querySelector('input[name="placeName"]');
  const linkInput = document.querySelector('input[name="placeLink"]');
  const name = nameInput.value;
  const link = linkInput.value;
  const card = createCardElement({ name, link });
  elementsList.prepend(card);
};

// helper methods

const createCardElement = item => {
  const elementTemplate = document.querySelector('#element__template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const deleteButton = element.querySelector('.element__delete-button');
  const likeButton = element.querySelector('.element__like-button');

  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;

  deleteButton.addEventListener('click', () => {
    elementsList.removeChild(element);
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  });
  return element;
};
