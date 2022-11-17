
$(document).ready(onReady);

let operator = null; 

let test;

//event handlers
function onReady() {      
    console.log('onReady') 
    $('#plus-btn').on('click', setOperator);
    $('#minus-btn').on('click', setOperator);
    $('#times-btn').on('click', setOperator);
    $('#divide-btn').on('click', setOperator);
    $('#equals-btn').on('click', equals);
    $('#clear-btn').on('click', clearInput);
    $('#clearAll-btn').on('click', clearAll);
    getCalculation();    
}

// send user input to server
function equals() {   
  $.ajax({
    method: 'POST',
    url: '/calculation',
    data: {
      numberOne: $('#numberOne').val(),
      numberTwo: $('#numberTwo').val(),
      operator: operator
    }
    }).then(function(response) {
    console.log(response);
    getCalculation();
    removeColor();
  }).catch(function(error) {
    alert(error);
  })
}

//requst updated calculator history from server
function getCalculation() {   
  $.ajax({
    method: 'GET',
    url: '/calculation'
  }).then(function(response){
    console.log(response);
   appendToDom(response);
  }).catch(function(error){
    alert('Fail', error);
  })

}

// render to dom
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

//request sever to clear history set all fields to empty
function clearAll() {    
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

//set calculation operator
function setOperator() {
  removeColor();
  $(this).addClass('color')
  console.log('in set operator')
  operator = $(this).text();
}

//clear input values and unselect operator
function clearInput() {
  removeColor();
  $('#numberOne').val('');
  $('#numberTwo').val('');
  operator = null;
}

// remove color from operator
function removeColor() {                
  $('#minus-btn').removeClass('color');
  $('#plus-btn').removeClass('color');
  $('#times-btn').removeClass('color');
  $('#divide-btn').removeClass('color');
}

