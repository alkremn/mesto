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
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._handleLikeButton = handleLikeButton;
    this._handleLikeButton = this._handleLikeButton.bind(this);
    this.updateLikeCount = this.updateLikeCount.bind(this);
    this._isLiked = data.likes.find(like => like._id == userId);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _handleDelete(evt) {
    this._handleDeleteConfirm(evt, this._id);
  }

  _handleLikeIcon() {
    if (this._isLiked) {
      this._likeButton.classList.remove('card__like-button_active');
      this._isLiked = false;
      this._handleLikeButton(this._isLiked, this._id, this.updateLikeCount);
    } else {
      this._likeButton.classList.add('card__like-button_active');
      this._isLiked = true;
      this._handleLikeButton(this._isLiked, this._id, this.updateLikeCount);
    }
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__delete-button')
      .addEventListener('click', this._handleDelete);

    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => this._handleLikeIcon());

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.card__image');

    this._setEventListeners();

    if (userId !== this._ownerId) {
      this._element
        .querySelector('.card__delete-button')
        .classList.add('card__delete-button--disabled');
    }

    this._isLiked
      ? this._likeButton.classList.add('card__like-button_active')
      : this._likeButton.classList.remove('card__like-button_active');

    this.updateLikeCount(this._likeCount);

    this._element.querySelector('.card__title').textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    return this._element;
  }

  updateLikeCount(count) {
    this._element.querySelector('.card__like-count').textContent = count;
  }
}
