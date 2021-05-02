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
    this._items.add(item);
  }

  addItems(items) {
    this._items = items;
  }

  removeItem(itemId) {
    console.log(itemId);
    console.log(this._items);
    const element = this._items.find(item => item._id == itemId);
    console.log(element);
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
