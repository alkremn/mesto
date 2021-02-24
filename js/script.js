const editButton = document.querySelector('.profile__editButton');
const closeFormButton = document.querySelector('.popup__closeButton');
const formElement = document.querySelector('.popup__container');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__nameInput');
const jobInput = document.querySelector('.popup__jobInput');

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
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popup.classList.remove('popup_opened');
  document.body.style.overflow = 'auto';
});
