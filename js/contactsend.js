// Email functionality using mailto
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var mailtoLink = `mailto:rakeshg14112001@gmail.com?subject=Message from ${name}&body=Email: ${email}%0D%0A%0D%0A${message}`;

  window.location.href = mailtoLink;
});
