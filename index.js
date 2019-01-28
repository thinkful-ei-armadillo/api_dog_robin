'use strict';

function getDogImages(count) {
  fetch(`https://dog.ceo/api/breeds/image/random${count === 1 ? '' : `/${count}` }`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('h2').html(generatePictures(responseJson));
  $('.results').removeClass('hidden');
}

function generatePictures(responseJson){
    let images = "";
    responseJson.message.forEach(imgLink => images += 
    `<img src="${imgLink}" class="results-img">\n` );
    return images;
}

function watchForm() {
  $('form').on('submit', event => {
    event.preventDefault();
    const picNum = $('.js-img-number').val();
    getDogImages(picNum);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});