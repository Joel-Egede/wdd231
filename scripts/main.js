// =========================
// Responsive Navigation Menu
// =========================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});


// =========================
// Display Current Year
// =========================

const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


// =========================
// Display Last Modified Date
// =========================

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;