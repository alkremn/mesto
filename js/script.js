let editButton = document.querySelector('.profile__edit-button');
let closeFormButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

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
  let name = nameInput.value;
  let job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popup.classList.remove('popup_opened');
  document.body.style.overflow = 'auto';
});
