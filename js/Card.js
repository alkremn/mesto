export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleDelete(e) {
    e.target.closest(".card").remove();
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handlePreviewImage(imagePopup) {
    const image = imagePopup.querySelector(".popup__image");
    const description = imagePopup.querySelector(".popup__caption");

    image.alt = this._name;
    image.src = this._link;
    description.textContent = this._name;
  }

  _setEventListeners(imagePopup, handlePopupOpen) {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);

    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    this._imageElement.addEventListener("click", () => {
      this._handlePreviewImage(imagePopup);
      handlePopupOpen(imagePopup);
    });
  }

  generateCard(imagePopup, handlePopupOpen) {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");

    this._setEventListeners(imagePopup, handlePopupOpen);

    this._element.querySelector(".card__title").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    return this._element;
  }
}
