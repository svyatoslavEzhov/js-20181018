
const HIDDEN_CLASS = 'js-hidden';

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  on(eventType, callback) {
    this._element.addEventListener(eventType, callback);
  }

  show() { this._element.classList.remove(HIDDEN_CLASS) }

  hide() { this._element.classList.add(HIDDEN_CLASS) }
}
