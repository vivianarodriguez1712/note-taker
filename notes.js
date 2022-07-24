const fs = require('fs');
const path = require('path');

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(notes => notes.title === query.title);
  }
  if (query.text) {
    filteredResults = filteredResults.filter(notes => notes.text === query.text);
  }
  return filteredResults;
}