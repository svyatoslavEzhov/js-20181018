import Component from '../../shared/component.js';

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

    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}">

    <button data-element="button-back">Back</button>
    <button>Add to basket</button>


    <h1>${phone.name}</h1>

    <p>${phone.description}</p>

    <ul class="phone-thumbs">
      <li>
        <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
      </li>
      <li>
        <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
      </li>
      <li>
        <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
      </li>
      <li>
        <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
      </li>
      <li>
        <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
      </li>
      <li>
        <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
      </li>
    </ul>
    `;
  }
}
