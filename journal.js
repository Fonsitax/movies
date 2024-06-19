import { updateUI } from './src/journalUi.js';

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

updateUI(favorites);