// Smooth scrolling to sections
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Email functionality using mailto
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var mailtoLink = `mailto:rakeshg9019112106@gmail.com?subject=Message from ${name}&body=Email: ${email}%0D%0A%0D%0A${message}`;

  window.location.href = mailtoLink;
});
