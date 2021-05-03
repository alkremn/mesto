export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._items.push(item);
  }

  addItems(items) {
    this._items = items;
  }

  removeItem(item) {
    this._container.removeChild(item);
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
