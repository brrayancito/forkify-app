import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// --------------
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
///------------------------------------------------------
if (module.hot) module.hot.accept(); // Not reload automatically

///////////////////////////////////////

// ---------------------------------------- Control Recipes 🟨
const controlRecipes = async function () {
  try {
    // Getting ID RECIPE from Windows URL
    // const id = window.location.hash; // -> #5ed6604591c37cdc054bcb34
    const id = window.location.hash.slice(1); //-> 5ed6604591c37cdc054bcb34
    if (!id) return;

    //Render Spiner
    recipeView.renderSpiner();

    //Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //Update bookamrks
    bookmarksView.update(model.state.bookmarks);

    // Loading recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // console.error(error);
    recipeView.renderError();
  }
};

// ---------------------------------------- Control Results 🟨
const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    //Render Spiner
    resultsView.renderSpiner();

    // Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render Pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------- Control Pagination 🟨
const controlPagination = function (goToPage) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW Pagination buttons
  paginationView.render(model.state.search);
};

// ---------------------------------------- Control Serving 🟨
const controlServing = function (newServings) {
  // Update the recipe serving (in state)
  model.updateServing(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// -------------------------- Control Add / Delete Bookmark 🟨
const controlAddBookmark = function () {
  // 1) Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update UI
  recipeView.update(model.state.recipe);

  // 3) Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// ---------------------------------- Control Upload Recipe 🟨
const controlUploadRecipe = async function (newRecipe) {
  try {
    // Render loading spiner
    addRecipeView.renderSpiner();

    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Render Success messaje
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form window
    // setTimeout(function () {
    //   addRecipeView.toggleWindow();
    // }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

// ------------------------------------------------- Events 🟨
// recipeView.addHandlerRender(controlRecipes);
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
};
init();
