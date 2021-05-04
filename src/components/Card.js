import { selectorNames } from '../utils/constants';
export default class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteConfirm,
    handleLikeButton
  ) {
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._handleLikeButton = handleLikeButton;
    this._isLiked = data.likes.some(like => like._id == this._userId);
  }

  getCardId() {
    return this._id;
  }

  getIsLiked() {
    return this._isLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__delete-button')
      .addEventListener('click', () => this._handleDeleteConfirm(this));

    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () =>
      this._handleLikeButton(this)
    );

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.card__image');

    this._setEventListeners();

    if (this._userId !== this._ownerId) {
      this._element
        .querySelector('.card__delete-button')
        .classList.add('card__delete-button--disabled');
    }

    this._element.querySelector('.card__title').textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._updateLikeUI(this._likeCount);

    return this._element;
  }

  updateLikeStatus(isLiked, count) {
    this._isLiked = isLiked;
    this._updateLikeUI(count);
  }

  _updateLikeUI(count) {
    this._isLiked
      ? this._likeButton.classList.add('card__like-button_active')
      : this._likeButton.classList.remove('card__like-button_active');
    this._element.querySelector('.card__like-count').textContent = count;
  }

  removeCard() {
    this._element.remove();
  }
}
