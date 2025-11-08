document.addEventListener("DOMContentLoaded", () => {
    // ✅ Initialize EmailJS properly
    emailjs.init({
        publicKey: "7wpLxqTA8K_Jcklc3" // Remove "public_" prefix inside the string
    });

    let form = document.getElementById("bookingForm");
    let thankMsg = document.getElementById("thankYouMsg");


    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop form reload

        document.getElementById("service_name").value = addedItems.map(item => item.name).join(", ");
        document.getElementById("total_price").value = addedItems.reduce((sum, item) => sum + item.price, 0);


        emailjs.sendForm("service_nx3oczf", "template_vjdi2d9", form)
            .then(() => {
                console.log("Email submitted successfully ✅");
                thankMsg.style.display = "block"; // Show thank you message
                setTimeout(() => (thankMsg.style.display = "none"), 5000); // Hide after 5s
                form.reset(); // Clear form inputs
            })
            .catch((error) => {
                console.error("Email sending failed ❌:", error);
                alert("Something went wrong! Try again later.");
            });
    });
});
