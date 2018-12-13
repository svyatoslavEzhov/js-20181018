import Component from '../../../shared/component.js';
import template from './phone-viewer.hbs';
import './phone-viewer.css';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', event => {
      let backButton = event.target.closest('[data-element="button-back"]')
      if (!backButton) return;

      let customEvent = new CustomEvent('back');
      this._element.dispatchEvent(customEvent);
    })
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  _render() {
    const { _phone: phone } = this;
    this._element.innerHTML = template({ phone });
  }
}
