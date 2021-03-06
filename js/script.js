//functions
function renderInitialCards() {
  const cards = initialCards.map(createCardElement);
  elementsList.append(...cards);
}

function openPopup(popup) {
  popup.classlist.add('popup_opened');
}

function closePopup(popup) {
  popup.classlist.remove('popup_opened');
}

const elementsList = document.querySelector('.elements__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// edit profile popup
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = editPopup.querySelector('input[name="name"]');
const jobInput = editPopup.querySelector('input[name="job"]');
const editForm = editPopup.querySelector('.popup__content');

editForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  editPopup.classList.remove('popup_opened');
  document.body.style.overflow = 'auto';
});

// Add card popup
const addPopup = document.querySelector('.popup_type_new-card');
const addForm = addPopup.querySelector('.popup__content');

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const nameInput = addPopup.querySelector('input[name="name"]');
  const linkInput = addPopup.querySelector('input[name="link"]');
  const name = nameInput.value;
  const link = linkInput.value;
  if (name && link) {
    const card = createCardElement({ name, link });
    elementsList.prepend(card);
  }
  nameInput.value = '';
  linkInput.value = '';
  addPopup.classList.remove('popup_opened');
  document.body.style.overflow = 'auto';
});

editPopup
  .querySelector('.popup__close-button')
  .addEventListener('click', () => {
    editPopup.classList.remove('popup_opened');
    document.body.style.overflow = 'auto';
  });

addForm.querySelector('.popup__close-button').addEventListener('click', () => {
  addPopup.classList.remove('popup_opened');
  document.body.style.overflow = 'auto';
});

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  editPopup.classList.add('popup_opened');
  document.body.style.overflow = 'hidden';
});

addButton.addEventListener('click', () => {
  addPopup.classList.add('popup_opened');
  document.body.style.overflow = 'hidden';
});

// helper methods
const createCardElement = item => {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const deleteButton = element.querySelector('.element__delete-button');
  const likeButton = element.querySelector('.element__like-button');

  elementImage.style.backgroundImage = `url('${item.link}')`;
  elementTitle.textContent = item.name;

  deleteButton.addEventListener('click', e => {
    e.target.closest('.element').remove();
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  });
  elementImage.addEventListener('click', () => {
    const imagePopup = document.querySelector('.popup_type_image');
    const image = imagePopup.querySelector('.popup__image');
    image.alt = item.name;
    image.src = item.link;
    const description = imagePopup.querySelector('.popup__caption');
    description.textContent = item.name;

    const closeButton = imagePopup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => {
      imagePopup.classList.remove('popup_opened');
      document.body.style.overflow = 'auto';
    });
    imagePopup.classList.add('popup_opened');
    document.body.style.overflow = 'hidden';
  });
  return element;
};

renderInitialCards();
