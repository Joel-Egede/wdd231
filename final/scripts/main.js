const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}


const yearElement = document.querySelector("#current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/*
    Demonstrates localStorage use.

    The site records that the visitor has visited
    Maintenance Hub.
*/
const visitKey = "maintenanceHubVisited";

if (!localStorage.getItem(visitKey)) {
    localStorage.setItem(
        visitKey,
        new Date().toISOString()
    );
}