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
   VISITOR MESSAGE
========================= */

const visitorMessage =
    document.querySelector("#visitorMessage");

if (visitorMessage) {

    const now = Date.now();

    const previousVisit =
        localStorage.getItem("lagosChamberLastVisit");

    if (!previousVisit) {

        visitorMessage.textContent =
            "Welcome! Let us know if you have any questions about the Lagos Chamber of Commerce.";

    } else {

        const previousTime = Number(previousVisit);

        const difference = now - previousTime;

        const days =
            Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );

        if (days < 1) {

            visitorMessage.textContent =
                "Welcome back! We hope you enjoy discovering Lagos.";

        } else if (days === 1) {

            visitorMessage.textContent =
                "Welcome back! It has been 1 day since your last visit.";

        } else {

            visitorMessage.textContent =
                `Welcome back! It has been ${days} days since your last visit.`;

        }
    }

    localStorage.setItem(
        "lagosChamberLastVisit",
        now.toString()
    );
}