
const HIDDEN_CLASS = 'js-hidden';

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  on(eventType, selector, callback) {
    if (!callback) {
      callback = selector;
      this._element.addEventListener(eventType, callback);
      return;
    }

    this._element.addEventListener(eventType, event => {
      let delegateTarget = event.target.closest(selector);
      if (!delegateTarget) return;

      event.delegateTarget = delegateTarget;
      callback(event);
    });
  }

  _trigger(eventName, detail) {
    let customEvent = new CustomEvent(eventName, { detail });
    this._element.dispatchEvent(customEvent);
  }

  show() { this._element.classList.remove(HIDDEN_CLASS) }

  hide() { this._element.classList.add(HIDDEN_CLASS) }
}
