import View from './view.js';
import previewView from './previewView.js';

export class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup(bookmarks) {
    return bookmarks
      .map(bookmark => previewView._generateMarkupPreview(bookmark))
      .join('');
  }
}

export default new BookmarksView();
