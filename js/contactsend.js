function openGmail() {
  // Get the email address you want to send the message to
  var toAddress = "example@example.com"; // Replace this with your desired recipient email address

  // Construct the Gmail compose URL with the "to" address
  var gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=" +
    encodeURIComponent(toAddress);

  // Optionally, add subject and body parameters
  var subject = "Hello from Gmail";
  var body = "This is a test email sent via a button click.";
  gmailUrl +=
    "&su=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

  // Open Gmail in a new tab or window
  window.open(gmailUrl, "_blank");
}
