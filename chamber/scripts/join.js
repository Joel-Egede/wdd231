const menuButton = document.querySelector("#menuButton");
const primaryNav = document.querySelector("#primaryNav");

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}


/* =========================
   TIMESTAMP
========================= */

const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


/* =========================
   MEMBERSHIP MODALS
========================= */

const modalButtons = document.querySelectorAll("[data-modal]");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});


/* =========================
   CLOSE MODALS
========================= */

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


/* =========================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================= */

document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
        const rectangle = dialog.getBoundingClientRect();

        const clickedInside =
            event.clientX >= rectangle.left &&
            event.clientX <= rectangle.right &&
            event.clientY >= rectangle.top &&
            event.clientY <= rectangle.bottom;

        if (!clickedInside) {
            dialog.close();
        }
    });
});