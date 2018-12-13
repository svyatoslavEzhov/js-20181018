import Component from '../../shared/component.js';

export default class PhoneFilter extends Component {
  constructor({element}) {
    super({element});
    this._element = element;

    this._render();

    this._searchInput = element.querySelector('input');
    this._searchInput.addEventListener('input', event => {
      this._trigger('search', event.target.value);
    })

    this._sortControl = element.querySelector('select');
    this._sortControl.addEventListener('change', event => {
      this._trigger('sort', event.target.value);
    })
  }

  _render() {
    this._element.innerHTML = `
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
    `;
  }
}
