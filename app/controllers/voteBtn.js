(function () {

var voteButton = document.querySelector("#btn-vote");
var deleteButton = document.querySelector('#delete-poll'); 
   
var ajaxFunctions = {
   ready: function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }
      if (document.readyState === 'complete') {
         return fn();
      }
      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };
      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
};

 voteButton.addEventListener('click', function(){
var x = document.getElementById('poll-votes').textContent;
var num = parseFloat(x);
var s =num+1;
document.getElementById('poll-votes').innerHTML = s;

 var title  = document.getElementById('chart-title').textContent;
 var url = '/addpollvotes/'+title;
  ajaxFunctions.ajaxRequest('GET', url, function(err, doc){
      if(err) throw err;
      else null;
  });
 }, false);


 })();