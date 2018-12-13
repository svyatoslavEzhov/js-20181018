'use strict';

import PhoneCatalog from './phone-catalog.js';
import PhoneViewer from './phone-viewer.js';
import ShoppingCart from './shopping-cart.js';
import PhonesFilter from './phones-filter.js';


import PhoneService from '../services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initCart();
    this._initFilter();

    let phonesPromise = PhoneService.getPhones();
    phonesPromise.then((sortedFilteredPhones) => {
      this._catalog.showPhones(sortedFilteredPhones);
    });
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.on('phoneSelected', (event) => {
      let phonePromise = PhoneService.getPhone(event.detail.phoneId);
      phonePromise.then((phone) => {
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

  _initFilter() {
    this._filter = new PhonesFilter({
      element: this._element.querySelector('[data-component="phones-filter"]')
    });

    this._filter.on('search', event => {
      PhoneService.getPhones({ query: event.detail })
      .then(filteredPhones => {
        this._catalog.showPhones(filteredPhones);
      })
    })

    this._filter.on('sort', event => {
      PhoneService.getPhones({ orderField: event.detail })
        .then(sortedPhones => {
          this._catalog.showPhones(sortedPhones);
      })
    })
  }

  _render() {
    this._element.innerHTML = `
       <div class="row">
        <!--Sidebar-->
        <div class="col-md-2">
            <section>
                <div data-component="phones-filter"></div>
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
