import View from './view.js';
import icons from 'url:../../img/icons.svg';

export class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup(data) {
    const currPage = data.page;
    const numPages = Math.ceil(data.results.length / data.resultsPerPage);

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
            <button data-goto="${
              currPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
    }

    // Last page
    if (currPage === numPages && numPages > 1)
      return `
            <button data-goto="${
              currPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
    `;

    // other page
    if (currPage < numPages) {
      return `
            <button data-goto="${
              currPage - 1
            }" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage - 1}</span>
            </button>
            <button data-goto="${
              currPage + 1
            }" class="btn--inline pagination__btn--next">
                        <span>Page ${currPage + 1}</span>
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-right"></use>
                        </svg>
            </button>
        `;
    }

    // Page 1, and there are NOT other pages
    return ``;
  }
}
export default new PaginationView();
