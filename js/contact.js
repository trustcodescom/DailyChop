const formMessage = document.querySelector(".form-message");
const contactForm = document.getElementById("contactForm");

emailjs.init({
    publicKey: "JGkVmeNZ-A1c0HrNm",
});

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".submit-btn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(
        "service_zmed196",
        "template_6yqsym3",
        contactForm
    )
    .then(() => {
        formMessage.textContent = "✅ Your message has been sent successfully!";
        formMessage.className = "form-message success show";

        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

        // Hide the success message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove("show");

            setTimeout(() => {
                formMessage.textContent = "";
                formMessage.className = "form-message";
            }, 400);
        }, 5000);

    })
    .catch((error) => {
        console.log("EmailJS Error:", error);
        console.log("Status:", error.status);
        console.log("Text:", error.text);

        formMessage.textContent = "❌ Failed to send message. Please try again.";
        formMessage.className = "form-message error show";

        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

        // Hide the error message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove("show");

            setTimeout(() => {
                formMessage.textContent = "";
                formMessage.className = "form-message";
            }, 400);
        }, 5000);
    });
});