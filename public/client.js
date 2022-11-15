

//TODO 
//add button for clear all
//more css
//include the history function in your onReady() 
//resverse for loop





$(document).ready(onReady);

let operator = null; 

let test;

function onReady() {      //event handlers
    console.log('onReady')  //Checking to see if jquery is loaded
    $('#plus-btn').on('click', setOperator);
    $('#minus-btn').on('click', setOperator);
    $('#times-btn').on('click', setOperator);
    $('#divide-btn').on('click', setOperator);
    $('#equals-btn').on('click', equals);
    $('#clear-btn').on('click', clearInput);
    $('#clearAll-btn').on('click', clearAll);
    getCalculation();    //History function
}

function equals() {   // send user input to server
  // removeColor();                               //junk
  $.ajax({
    method: 'POST',
    url: '/calculation',
    data: {
      numberOne: $('#numberOne').val(),
      numberTwo: $('#numberTwo').val(),
      operator: operator
    }
    }).then(function(response) {
    console.log('My name a Borat', response);
    getCalculation();
    removeColor();
  }).catch(function(error) {
    alert('check engine', error);
  })
}

function getCalculation() {   //requst updated calculator history from server
  $.ajax({
    method: 'GET',
    url: '/calculation'
  }).then(function(response){
    console.log('Great Success!', response);
   appendToDom(response);
  }).catch(function(error){
    alert('Fail', error);
  })

}
// for (let i =response.length ; i>0; i--)
function appendToDom(response) {
  $('#numberOne').val('');
  $('#numberTwo').val('');
  operator = null;
  $('#output').empty(); 
  $('#calculation').empty();
  for(let i = 0; i<response.length; i++){
    $('#output').prepend(`
    <li>${response[i].numberOne}${response[i].operator}${response[i].numberTwo}=${response[i].answer}</li>  
    `)
    console.log(response[i].answer)
    $('#calculation').empty();
    $('#calculation').append(`${response[i].answer}`)
  }

}

function clearAll() {    //request sever to clear history set all fields to empty
  clearInput();
  $.ajax({
    method: 'DELETE',
    url: '/calculation'
  }).then(function(response){
    getCalculation();
    console.log(response);
  }).catch(function(error){
    alert('something went wrong',error)
  })
}

function setOperator() {
  removeColor();
  $(this).addClass('color')
  console.log('in set operator')
  operator = $(this).text();
}

function clearInput() {
  removeColor();
  $('#numberOne').val('');
  $('#numberTwo').val('');
  operator = null;
}

function removeColor() {                //better way to remove?
  $('#minus-btn').removeClass('color');
  $('#plus-btn').removeClass('color');
  $('#times-btn').removeClass('color');
  $('#divide-btn').removeClass('color');
}

