export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._pageSelector = document.querySelector(".page");
    this._handleCloseEvent = this._handleCloseEvent.bind(this);
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

  _handleOpenPopup(imagePopup) {
    imagePopup.classList.add("popup_opened");
    document.addEventListener("click", this._handleCloseEvent);
    document.addEventListener("keydown", this._handleCloseEvent);
  }

  _handleClosePopup(imagePopup) {
    imagePopup.classList.remove("popup_opened");
    document.removeEventListener("click", this._handleCloseEvent);
    document.removeEventListener("keydown", this._handleCloseEvent);
  }

  _handleCloseEvent(evt) {
    if (evt.key === "Escape" || evt.target.classList.contains("popup")) {
      const popupOpened = document.querySelector(".popup_opened");
      if (popupOpened) {
        this._handleClosePopup(popupOpened);
      }
    }
  }

  _handlePreviewImage(imagePopup) {
    const image = imagePopup.querySelector(".popup__image");
    const description = imagePopup.querySelector(".popup__caption");
    const closeImageButton = imagePopup.querySelector(".popup__close-button");

    closeImageButton.addEventListener("click", () =>
      this._handleClosePopup(imagePopup)
    );

    image.alt = this._name;
    image.src = this._link;
    description.textContent = this._name;
    this._handleOpenPopup(imagePopup);
  }

  _setEventListeners(imagePopup) {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);

    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    this._imageElement.addEventListener("click", () =>
      this._handlePreviewImage(imagePopup)
    );
  }

  generateCard(imagePopup) {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");

    this._setEventListeners(imagePopup);

    this._element.querySelector(".card__title").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    return this._element;
  }
}
