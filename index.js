/* eslint-disable no-console */
/* global $ */ 
'use strict';

function getDogImages(value) {
  const numberInput = (typeof value === 'number') ? `/${value}`: ''; 
  const stringBreedInput = (typeof value === 'string') ? `/${value}/images` : 's/image';
 
  fetch(`https://dog.ceo/api/breed${stringBreedInput}/random${numberInput}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    // eslint-disable-next-line no-unused-vars
    .catch(error => alert('Breed Not Found'));
}

function displayResults(responseJson) {
  $('h2').html(generatePictures(responseJson));
  $('.results').removeClass('hidden');
}

function generatePictures(responseJson){
  let images = '';
  if (typeof responseJson.message !== 'string') {
    responseJson.message.forEach(imgLink => { 
      images +=  `<img src="${imgLink}" class="results-img">\n`;});
  } else {
    images = `<img src="${responseJson.message}" class="results-img">`;
  } return images;
}

function watchBreed(){
  $('.js-breed-form').on('submit', function(event){
    event.preventDefault();
    const breedType = $('#dog-breed').val();
    getDogImages(breedType);
  });
}

function watchForm() {
  $('.js-dog-pic-form').on('submit', event => {
    event.preventDefault();
    const picNum = $('.js-img-number').val();
    getDogImages(parseInt(picNum, 10));
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  watchBreed();
});