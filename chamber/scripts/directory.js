
const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

const dataURL = "data/members.json";


async function getMembers() {
    try {
        const response = await fetch(dataURL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        console.error("Unable to load member data:", error);

        directory.innerHTML = `
            <p class="error-message">
                Sorry, the business directory could not be loaded.
                Please try again later.
            </p>
        `;
    }
}


function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="${member.image}"
                alt="${member.name} business image"
                loading="lazy"
            >

            <h2>${member.name}</h2>

            <p>${member.description}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <a
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Website
            </a>

            <span class="member-level">
                ${getMembershipLevel(member.membership)}
            </span>
        `;

        directory.appendChild(card);
    });
}


function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}


gridButton.addEventListener("click", () => {
    directory.classList.remove("directory-list");
    directory.classList.add("directory-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});


listButton.addEventListener("click", () => {
    directory.classList.remove("directory-grid");
    directory.classList.add("directory-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});


menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
});


document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelector("#last-modified").textContent = document.lastModified;


getMembers();
