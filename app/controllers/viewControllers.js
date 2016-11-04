
(function () {

var optionsButton = document.querySelector('#addOpt');
var cancelButton = document.querySelector("#cancel");
var addOptButton = document.querySelector("#formBtn");

 
 optionsButton.addEventListener('click', function() {
     var form = document.getElementById('form-poll');
     var lastForm = document.getElementById('optionInput');
     var clone = lastForm.cloneNode(true);
     clone.textContent = " ";
     form.insertBefore(clone, form.lastElementChild);
 }, false);
  
 cancelButton.addEventListener('click', function(){
   var form = document.getElementById("form-poll");
   form.removeChild(form.childNodes[5]);
  }, false);
 
 addOptButton.addEventListener('click', function(){
   var formOpt = document.getElementById('form-opt');
   var p = document.getElementById('newOptionP');
   
   var inputVal = document.getElementById('formInput').value;
   var addInput = document.createElement("input");
   addInput.type = "submit";
   addInput.value = inputVal;
   addInput.className = "poll-option";
  
  formOpt.insertBefore(addInput, p);
  document.getElementById('formInput').value = " ";
  }, false);
 })();
