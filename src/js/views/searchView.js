class searchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
