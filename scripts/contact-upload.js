const ContactForm = document.querySelector('#contactForm');
let user = document.getElementById('user');
let email = document.getElementById('email');
let message = document.getElementById('message'); 

$(document).ready(function() {
    $('#contactForm').submit(function() {
      let FormData = {
        user: user.value,
        email: email.value,
        message: message.value
      }
      console.log(FormData);
      let boop = new XMLHttpRequest();
      boop.open('post', '/api/upload');
      boop.setRequestHeader('content-type', 'application/json');
      boop.send(JSON.stringify(FormData));
      $("#status").empty().text("File is uploading...");
      $(this).ajaxSubmit({
          error: function(xhr) {
        status('Error: ' + xhr.status);
          },
          success: function(response) {
      console.log(response)
          $("#status").empty().text(response);
          }
      });
    return false;
  });    
});