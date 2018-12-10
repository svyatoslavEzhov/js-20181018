'use strict';

import PhoneCatalog from './phone-catalog.js';
import PhoneViewer from './phone-viewer.js';
import ShoppingCart from './shopping-cart.js';

import PhoneService from '../services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initCart();

    PhoneService.getPhones((phones) => {
      this._catalog.showPhones(phones);
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.on('phoneSelected', (event) => {
      PhoneService.getPhone(event.detail.phoneId, (phone) => {
        this._catalog.hide();
        this._viewer.showPhone(phone);
      });
    })

    this._catalog.on('add', event => {
      let phoneId = event.detail;
      this._cart.addItem(phoneId)
    })
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    })

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalog.show();
    })

  }

  _initCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    })
  }

  _render() {
    this._element.innerHTML = `
       <div class="row">
        <!--Sidebar-->
        <div class="col-md-2">
            <section>
                <p>
                    Search:
                    <input>
                </p>

                <p>
                    Sort by:
                    <select>
                        <option value="name">Alphabetical</option>
                        <option value="age">Newest</option>
                    </select>
                </p>
            </section>

            <section>
                <div data-component="shopping-cart"></div>
            </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
           <div data-component="phone-catalog" class="js-hidden"></div>
           <div data-component="phone-viewer" class="js-hidden"></div>
        </div>
    </div>
    `;
  }
}
