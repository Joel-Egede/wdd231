// Responsive navigation menu
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Display the current year
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

// Display the date the document was last modified
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;