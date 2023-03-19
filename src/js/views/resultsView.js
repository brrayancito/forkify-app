import View from './view.js';
import previewView from './previewView.js';

export class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!';

  _generateMarkup(results) {
    return results
      .map(result => previewView._generateMarkupPreview(result))
      .join('');
  }
}

export default new ResultsView();
