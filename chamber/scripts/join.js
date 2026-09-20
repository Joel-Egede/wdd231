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
   FOOTER
========================= */

const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    const modifiedDate = new Date(document.lastModified);

    lastModified.textContent = modifiedDate.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


/* =========================
   TIMESTAMP
========================= */

const timestamp =
    document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value =
        new Date().toISOString();
}


/* =========================
   MEMBERSHIP MODALS
========================= */

const modalButtons =
    document.querySelectorAll(
        "[data-modal]"
    );


modalButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modalId =
            button.getAttribute("data-modal");

        const modal =
            document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});


const closeButtons =
    document.querySelectorAll(
        ".close-modal"
    );


closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modal =
            button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


document
    .querySelectorAll("dialog")
    .forEach(dialog => {

        dialog.addEventListener(
            "click",
            event => {

                const rectangle =
                    dialog.getBoundingClientRect();

                const clickedInside =
                    event.clientX >= rectangle.left &&
                    event.clientX <= rectangle.right &&
                    event.clientY >= rectangle.top &&
                    event.clientY <= rectangle.bottom;

                if (!clickedInside) {
                    dialog.close();
                }
            }
        );
    });