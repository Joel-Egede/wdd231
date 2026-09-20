const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});


/* FOOTER */

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    `Last Modified: ${document.lastModified}`;


/* FORM DATA */

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const organizationTitle = params.get("organizationTitle");
const membership = params.get("membership");
const description = params.get("description");
const timestamp = params.get("timestamp");

const applicationDetails = document.querySelector("#application-details");

applicationDetails.innerHTML = `
    <h2>Application Details</h2>

    <p>
        <strong>Name:</strong>
        ${firstName || ""} ${lastName || ""}
    </p>

    <p>
        <strong>Organization:</strong>
        ${organization || ""}
    </p>

    <p>
        <strong>Organization Title:</strong>
        ${organizationTitle || "Not provided"}
    </p>

    <p>
        <strong>Email:</strong>
        ${email || ""}
    </p>

    <p>
        <strong>Phone:</strong>
        ${phone || ""}
    </p>

    <p>
        <strong>Membership Level:</strong>
        ${membership || ""}
    </p>

    <p>
        <strong>Organization Description:</strong>
        ${description || "Not provided"}
    </p>

    <p>
        <strong>Application Submitted:</strong>
        ${timestamp || "Not available"}
    </p>
`;