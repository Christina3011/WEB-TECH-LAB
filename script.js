function validateName(name) {
    if (name.trim() === "") {
        return "Please enter your name.";
    } else if (name.trim().length < 2) {
        return "Name must be at least 2 characters long.";
    } else {
        return "";
    }
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
        return "Please enter your email address.";
    } else if (!emailPattern.test(email.trim())) {
        return "Please enter a valid email address.";
    } else {
        return "";
    }
}

function validateMessage(message) {
    if (message.trim() === "") {
        return "Please enter a message.";
    } else if (message.trim().length < 10) {
        return "Message must be at least 10 characters long.";
    } else {
        return "";
    }
}

function validateForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const successMessage = document.getElementById("form-success");

    nameError.textContent = validateName(nameInput.value);
    emailError.textContent = validateEmail(emailInput.value);
    messageError.textContent = validateMessage(messageInput.value);
    successMessage.textContent = "";

    nameInput.setAttribute("aria-invalid", nameError.textContent ? "true" : "false");
    emailInput.setAttribute("aria-invalid", emailError.textContent ? "true" : "false");
    messageInput.setAttribute("aria-invalid", messageError.textContent ? "true" : "false");

    if (nameError.textContent || emailError.textContent || messageError.textContent) {
        return false;
    } else {
        return true;
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
        const contactForm = document.getElementById("contact-form");
        const successMessage = document.getElementById("form-success");
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    message: document.getElementById("message").value
                })
            });
            const result = await response.json();

            if (!response.ok) {
                successMessage.textContent = result.message || "Your message could not be sent.";
                return;
            }

            successMessage.textContent = result.message;
            contactForm.reset();
            document.getElementById("name").removeAttribute("aria-invalid");
            document.getElementById("email").removeAttribute("aria-invalid");
            document.getElementById("message").removeAttribute("aria-invalid");
        } catch (error) {
            successMessage.textContent = "Unable to send your message. Please try again.";
        } finally {
            submitButton.disabled = false;
        }
    } else {
        document.getElementById("form-success").textContent = "";
    }
}

function toggleFavourite(button) {
    const isFavourite = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", isFavourite ? "false" : "true");
    button.textContent = isFavourite ? "♡ Favourite" : "♥ Favourited";
    updateFavouriteCount();
}

function updateFavouriteCount() {
    const countElement = document.getElementById("favourite-count");

    if (countElement) {
        const favourites = document.querySelectorAll('.favourite-button[aria-pressed="true"]');
        countElement.textContent = favourites.length;
    }
}

function filterArtworks() {
    const searchInput = document.getElementById("artwork-search");
    const artworkCards = document.querySelectorAll(".artwork-card");
    const searchText = searchInput.value.trim().toLowerCase();

    artworkCards.forEach(function (card) {
        const title = card.querySelector(".artwork-copy h2").textContent.toLowerCase();
        card.hidden = !title.includes(searchText);
    });
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
}

const artworkSearch = document.getElementById("artwork-search");

if (artworkSearch) {
    artworkSearch.addEventListener("input", filterArtworks);

    const artworkCards = document.querySelectorAll(".artwork-card");
    artworkCards.forEach(function (card) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "favourite-button";
        button.textContent = "♡ Favourite";
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("click", function () {
            toggleFavourite(button);
        });
        card.querySelector(".artwork-copy").appendChild(button);
    });

    updateFavouriteCount();
}
