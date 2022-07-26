const fs = require('fs');
const path = require('path');

const { text } = require("body-parser");

function filterByQuery(query, notesArray) {
 
  let filteredResults = notesArray;
  if (query.text) {

    if (typeof query.text === 'string') {
      textArray = [query.text];
    } else {
      textArray = query.text;
    }

    textArray.forEach(text => {
      filteredResults = filteredResults.filter(
        notes => notes.text.indexOf(text) !== -1
      );
  });
}
 
  if (query.title) {
    filteredResults = filteredResults.filter(notes => notes.title === query.title);
  }
  if (query.text) {
    filteredResults = filteredResults.filter(notes => notes.text === query.text);
  }
  return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter(notes => notes.id === id)[0];
  return result;
}

module.exports = {
  filterByQuery,
  findById,
};

