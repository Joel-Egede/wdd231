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
   FORM DATA
========================= */

const params = new URLSearchParams(window.location.search);


function displayValue(elementId, parameterName) {
    const element = document.querySelector(`#${elementId}`);

    if (!element) {
        return;
    }

    const value = params.get(parameterName);

    if (value) {
        element.textContent = value;
    } else {
        element.textContent = "--";
    }
}


displayValue("displayFirstName", "firstName");
displayValue("displayLastName", "lastName");
displayValue("displayEmail", "email");
displayValue("displayPhone", "phone");
displayValue("displayOrganization", "organization");
displayValue("displayMembership", "membership");
displayValue("displayTimestamp", "timestamp");