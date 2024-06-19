import { updateUI } from './src/journalUi.js';

export const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

updateUI(favorites);