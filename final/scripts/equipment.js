import "./main.js";

const dataUrl = "./data/equipment.json";

const equipmentList = document.querySelector("#equipment-list");
const searchInput = document.querySelector("#equipment-search");
const categoryFilter = document.querySelector("#category-filter");
const savedCount = document.querySelector("#saved-count");
const showSavedButton = document.querySelector("#show-saved");

const modal = document.querySelector("#equipment-modal");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector("#modal-close");

const storageKey = "maintenanceHubSavedEquipment";

let equipmentData = [];
let showSavedOnly = false;


/*
    Get saved equipment IDs from localStorage.
*/
function getSavedEquipment() {
    return JSON.parse(
        localStorage.getItem(storageKey) || "[]"
    );
}


/*
    Save equipment IDs to localStorage.
*/
function saveEquipment(ids) {
    localStorage.setItem(
        storageKey,
        JSON.stringify(ids)
    );

    updateSavedCount();
}


/*
    Update saved equipment count.
*/
function updateSavedCount() {
    const savedEquipment = getSavedEquipment();

    if (savedCount) {
        savedCount.textContent = savedEquipment.length;
    }
}


/*
    Change the category name into readable text.
*/
function formatCategory(category) {
    return category
        .split("-")
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}


/*
    Create the equipment cards dynamically.
*/
function displayEquipment(items) {

    if (!equipmentList) {
        return;
    }

    if (items.length === 0) {
        equipmentList.innerHTML = `
            <div class="empty-state">
                <h2>No equipment found</h2>
                <p>
                    Try a different search term or category.
                </p>
            </div>
        `;

        return;
    }


    equipmentList.innerHTML = items.map((item) => {

        const savedEquipment = getSavedEquipment();

        const isSaved = savedEquipment.includes(item.id);

        return `
            <article class="equipment-card">

                <div class="equipment-card-top">
                    <span class="equipment-category">
                        ${formatCategory(item.category)}
                    </span>

                    <button
                        class="save-button ${isSaved ? "saved" : ""}"
                        type="button"
                        data-save="${item.id}"
                        aria-label="${isSaved ? "Remove" : "Save"} ${item.name}"
                    >
                        ${isSaved ? "★ Saved" : "☆ Save"}
                    </button>
                </div>

                <h2>
                    ${item.name}
                </h2>

                <p>
                    ${item.purpose}
                </p>

                <div class="equipment-problem">
                    <strong>Common Problem:</strong>
                    <p>
                        ${item.commonProblem}
                    </p>
                </div>

                <button
                    class="button button-small details-button"
                    type="button"
                    data-id="${item.id}"
                >
                    View Details
                </button>

            </article>
        `;
    }).join("");


    /*
        Add events to dynamically created buttons.
    */
    equipmentList
        .querySelectorAll("[data-save]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                handleSave
            );
        });


    equipmentList
        .querySelectorAll(".details-button")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => openModal(Number(button.dataset.id))
            );
        });
}


/*
    Save or remove an equipment item.
*/
function handleSave(event) {

    const id = Number(
        event.currentTarget.dataset.save
    );

    let savedEquipment = getSavedEquipment();

    if (savedEquipment.includes(id)) {

        savedEquipment = savedEquipment.filter(
            (savedId) => savedId !== id
        );

    } else {

        savedEquipment.push(id);
    }

    saveEquipment(savedEquipment);

    applyFilters();
}


/*
    Open the equipment details modal.
*/
function openModal(id) {

    const item = equipmentData.find(
        (equipment) => equipment.id === id
    );

    if (!item || !modal || !modalBody) {
        return;
    }


    modalBody.innerHTML = `
        <p class="eyebrow">
            ${formatCategory(item.category)}
        </p>

        <h2>
            ${item.name}
        </h2>

        <h3>
            Purpose
        </h3>

        <p>
            ${item.purpose}
        </p>

        <h3>
            Common Problem
        </h3>

        <p>
            ${item.commonProblem}
        </p>

        <h3>
            Maintenance
        </h3>

        <p>
            ${item.maintenance}
        </p>
    `;


    if (!modal.open) {
        modal.showModal();
    }
}


/*
    Apply search, category, and saved filters.
*/
function applyFilters() {

    const searchTerm =
        searchInput?.value.toLowerCase().trim() || "";

    const selectedCategory =
        categoryFilter?.value || "all";

    const savedEquipment = getSavedEquipment();


    const filteredItems = equipmentData
        .filter((item) => {

            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(searchTerm) ||
                item.purpose
                    .toLowerCase()
                    .includes(searchTerm) ||
                item.commonProblem
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                selectedCategory === "all" ||
                item.category === selectedCategory;


            const matchesSaved =
                !showSavedOnly ||
                savedEquipment.includes(item.id);


            return (
                matchesSearch &&
                matchesCategory &&
                matchesSaved
            );
        });


    displayEquipment(filteredItems);
}


/*
    Load equipment information using Fetch API.
*/
async function loadEquipment() {

    try {

        const response = await fetch(dataUrl);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        equipmentData = await response.json();

        displayEquipment(equipmentData);

        updateSavedCount();

    } catch (error) {

        console.error(
            "Unable to load equipment data:",
            error
        );

        if (equipmentList) {
            equipmentList.innerHTML = `
                <div class="error-message">

                    <h2>
                        Equipment data could not be loaded.
                    </h2>

                    <p>
                        Please check your connection and
                        try again.
                    </p>

                </div>
            `;
        }
    }
}


/*
    Search event.
*/
if (searchInput) {
    searchInput.addEventListener(
        "input",
        applyFilters
    );
}


/*
    Category filter event.
*/
if (categoryFilter) {
    categoryFilter.addEventListener(
        "change",
        applyFilters
    );
}


/*
    Saved equipment button.
*/
if (showSavedButton) {

    showSavedButton.addEventListener(
        "click",
        () => {

            showSavedOnly = !showSavedOnly;

            showSavedButton.textContent =
                showSavedOnly
                    ? "Show All"
                    : "Show Saved";

            applyFilters();
        }
    );
}


/*
    Close modal.
*/
if (modalClose) {

    modalClose.addEventListener(
        "click",
        () => modal.close()
    );
}


/*
    Close modal when clicking outside the content.
*/
if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (event.target === modal) {
                modal.close();
            }
        }
    );
}


loadEquipment();