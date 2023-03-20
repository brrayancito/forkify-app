import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   *Render the received object to the DOM
   * @param {object | object[]} data The data to be rendered (e.g recipe)
   * @returns Nothing
   * @this {Object} View instance
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup(this._data);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    //This is just HTML Text
    const NewMarkup = this._generateMarkup(this._data);

    //Now, this is a virtual DOM
    const newDOM = document.createRange().createContextualFragment(NewMarkup);

    //New Elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    //Current elements on the page
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    //Loop over both array
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      //Update changed TEXT
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      //Update changed ATTRIBUTE
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpiner() {
    const spiner = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spiner);
  }

  renderError(message = this._errorMessage) {
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
  `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // _clear() {
  //   this._parentElement.innerHTML = '';
  // }
}
