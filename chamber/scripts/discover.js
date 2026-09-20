// Discover page data
const discoverItems = [
    {
        title: "Lekki Conservation Centre",
        image: "images/discover-1.webp",
        description:
            "A protected nature reserve in Lekki featuring a canopy walkway, wildlife, and natural scenery."
    },
    {
        title: "National Museum Lagos",
        image: "images/discover-2.webp",
        description:
            "A cultural landmark preserving Nigerian history, traditional art, and important historical artifacts."
    },
    {
        title: "Nike Art Gallery",
        image: "images/discover-3.webp",
        description:
            "A major Lagos art center featuring Nigerian paintings, sculptures, textiles, and contemporary artwork."
    },
    {
        title: "Tarkwa Bay Beach",
        image: "images/discover-4.webp",
        description:
            "A scenic Lagos beach accessible by boat and known for its relaxed atmosphere and ocean views."
    },
    {
        title: "Third Mainland Bridge",
        image: "images/discover-5.webp",
        description:
            "One of Lagos's major bridges connecting communities across the Lagos Lagoon."
    },
    {
        title: "Balogun Market",
        image: "images/discover-6.webp",
        description:
            "A busy commercial district on Lagos Island known for its wide range of retail and wholesale businesses."
    },
    {
        title: "Freedom Park",
        image: "images/discover-7.webp",
        description:
            "A historic Lagos recreational and cultural space located on the former site of a colonial-era prison."
    },
    {
        title: "Victoria Island",
        image: "images/discover-8.webp",
        description:
            "A major business and commercial district featuring offices, restaurants, hotels, and financial institutions."
    }
];

const discoverGrid = document.querySelector("#discover-grid");

function displayDiscoverItems() {
    discoverItems.forEach((item) => {
        const card = document.createElement("article");

        card.classList.add("discover-card");

        card.innerHTML = `
            <figure>
                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                >
            </figure>

            <div class="discover-card-content">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <button type="button">Learn More</button>
            </div>
        `;

        discoverGrid.appendChild(card);
    });
}

displayDiscoverItems();


// Mobile navigation
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


// Current year
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


// Last modified
document.querySelector("#lastModified").textContent =
    document.lastModified;


// Visitor message using localStorage
const visitorMessage = document.querySelector("#visitor-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitorMessage.textContent =
        "Welcome! Let us know if you need help discovering Lagos.";
} else {
    const daysSinceVisit =
        Math.floor(
            (currentVisit - Number(lastVisit)) /
            (1000 * 60 * 60 * 24)
        );

    if (daysSinceVisit < 1) {
        visitorMessage.textContent =
            "Welcome back! We hope you enjoy discovering Lagos.";
    } else if (daysSinceVisit === 1) {
        visitorMessage.textContent =
            "You last visited 1 day ago. Welcome back!";
    } else {
        visitorMessage.textContent =
            `You last visited ${daysSinceVisit} days ago. Welcome back!`;
    }
}

localStorage.setItem("lastVisit", currentVisit);