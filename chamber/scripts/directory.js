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
   MEMBER DIRECTORY
========================= */

const membersContainer =
    document.querySelector("#members");


function getMembershipInfo(level) {

    switch (Number(level)) {

        case 3:
            return {
                name: "Gold Member",
                className: "membership-gold"
            };

        case 2:
            return {
                name: "Silver Member",
                className: "membership-silver"
            };

        default:
            return {
                name: "Member",
                className: "membership-member"
            };
    }
}


function createMemberCard(member) {

    const membership =
        getMembershipInfo(member.membershipLevel);

    const card =
        document.createElement("article");

    card.className = "member-card";

    card.innerHTML = `
        <img
            class="member-logo"
            src="images/${member.image}"
            alt="${member.name} logo"
            width="300"
            height="150"
            loading="lazy"
        >

        <div class="member-info">

            <h3>${member.name}</h3>

            <p>
                <span class="member-label">
                    Address:
                </span>
                ${member.address}
            </p>

            <p>
                <span class="member-label">
                    Phone:
                </span>

                <a
                    href="tel:${member.phone.replace(/\s/g, "")}"
                >
                    ${member.phone}
                </a>
            </p>

            <span class="membership ${membership.className}">
                ${membership.name}
            </span>

            <br>

            <a
                class="website-link"
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Website
            </a>

        </div>
    `;

    return card;
}


function displayMembers(members) {

    if (!membersContainer) return;

    membersContainer.innerHTML = "";

    members.forEach(member => {
        membersContainer.appendChild(
            createMemberCard(member)
        );
    });
}


async function getMembers() {

    if (!membersContainer) return;

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const members =
            await response.json();

        displayMembers(members);

    } catch (error) {

        console.error(
            "Unable to load member data:",
            error
        );

        membersContainer.innerHTML = `
            <p class="error-message">
                Sorry, the chamber member directory
                could not be loaded.
                Please try again later.
            </p>
        `;
    }
}


/* =========================
   GRID / LIST VIEW
========================= */

const gridButton =
    document.querySelector("#gridView");

const listButton =
    document.querySelector("#listView");


function showGrid() {

    if (!membersContainer) return;

    membersContainer.classList.remove(
        "member-list"
    );

    membersContainer.classList.add(
        "member-grid"
    );

    if (gridButton) {
        gridButton.classList.add("active");
        gridButton.setAttribute(
            "aria-pressed",
            "true"
        );
    }

    if (listButton) {
        listButton.classList.remove("active");
        listButton.setAttribute(
            "aria-pressed",
            "false"
        );
    }
}


function showList() {

    if (!membersContainer) return;

    membersContainer.classList.remove(
        "member-grid"
    );

    membersContainer.classList.add(
        "member-list"
    );

    if (listButton) {
        listButton.classList.add("active");
        listButton.setAttribute(
            "aria-pressed",
            "true"
        );
    }

    if (gridButton) {
        gridButton.classList.remove("active");
        gridButton.setAttribute(
            "aria-pressed",
            "false"
        );
    }
}


if (gridButton) {
    gridButton.addEventListener(
        "click",
        showGrid
    );
}

if (listButton) {
    listButton.addEventListener(
        "click",
        showList
    );
}


getMembers();