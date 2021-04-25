import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const image = this._popup.querySelector('.popup__image');
    image.alt = name;
    image.src = link;
    const description = this._popup.querySelector('.popup__caption');
    description.textContent = name;

    super.open();
  }
}
