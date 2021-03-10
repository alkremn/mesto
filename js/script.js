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

window.onload = () => {
  const elementsList = document.querySelector('.elements__list');
  const elementTemplate = document.querySelector('#element__template').content;

  // <img class="element__image" src="images/venecia.jpg" alt="Венеция">
  // <div class="element__description">
  //   <h3 class="element__title">Венеция</h3>
  //   <button class="element__like-button" type="button"></button>
  // </div>
  const cards = initialCards.map(item => {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = element.querySelector('.element__image');
    const elementTitle = element.querySelector('.element__title');
    const elementButton = element.querySelector('.element__like-button');
    elementImage.src = item.link;
    elementImage.alt = item.name;
    elementTitle.textContent = item.name;
    elementButton.addEventListener('click', () => {
      elementButton.classList.toggle('element__like-button_active');
    });
    return element;
  });
  console.log(cards);
  elementsList.append(...cards);
};

const editButton = document.querySelector('.profile__edit-button');
const closeFormButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

editButton.addEventListener('click', function () {
  document.body.style.overflow = 'hidden';
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popup.addEventListener('click', function (e) {
  if (e.target.className === 'popup popup_opened') {
    popup.classList.remove('popup_opened');
    document.body.style.overflow = 'auto';
  }
});

closeFormButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
  document.body.style.overflow = 'auto';
});

formElement.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(initialCards);
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popup.classList.remove('popup_opened');
  document.body.style.overflow = 'auto';
});
