document.addEventListener("DOMContentLoaded", function () {
    // Initialize Email.js with your User ID
    emailjs.init("mxuAs0ef52A2t-7iN");

    // Select the form
    document.querySelector(".contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        // Collect form data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        };

        // Validate input fields
        if (!formData.name || !formData.email || !formData.message) {
            alert("All fields are required!");
            return;
        }

        // Send email using Email.js
        emailjs.send("service_2d8knku", "template_wcozjor", {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: "rakeshg@gmail.com"
        }).then(
            function (response) {
                alert("Your message has been sent successfully!");
                console.log("Email sent:", response);
                document.querySelector(".contact-form").reset(); // Reset the form
            },
            function (error) {
                alert("Failed to send message. Please try again later.");
                console.error("Email error:", error);
            }
        );
    });
});
