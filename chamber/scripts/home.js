// ==========================================
// LAGOS CHAMBER OF COMMERCE
// HOME PAGE JAVASCRIPT
// ==========================================


// ---------- HAMBURGER MENU ----------

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.textContent = isOpen ? "✕" : "☰";
});


// ---------- CURRENT YEAR ----------

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


// ---------- LAST MODIFIED ----------

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


// ---------- WEATHER ----------

//  OpenWeatherMap API .
const API_KEY = "28de55f2b19a9855641713247937ce16";


const latitude = 6.5244;
const longitude = 3.3792;

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;


// ---------- CURRENT WEATHER ----------

async function getCurrentWeather() {

    try {

        const response = await fetch(currentWeatherURL);

        if (!response.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const data = await response.json();

        document.querySelector("#current-temperature").textContent =
            Math.round(data.main.temp);

        document.querySelector("#weather-description").textContent =
            data.weather[0].description;

    } catch (error) {

        console.error(error);

        document.querySelector("#current-temperature").textContent = "--";

        document.querySelector("#weather-description").textContent =
            "Weather information unavailable.";
    }
}


// ---------- THREE-DAY FORECAST ----------

async function getForecast() {

    const forecastContainer =
        document.querySelector("#forecast");

    try {

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Unable to retrieve forecast.");
        }

        const data = await response.json();

        forecastContainer.innerHTML = "";

        const dailyForecasts = [];

        for (const item of data.list) {

            const forecastDate = new Date(item.dt * 1000);

            const hour = forecastDate.getHours();

            if (
                hour === 12 &&
                dailyForecasts.length < 3
            ) {
                dailyForecasts.push(item);
            }
        }

        dailyForecasts.forEach((day) => {

            const date = new Date(day.dt * 1000);

            const dayName =
                date.toLocaleDateString("en-US", {
                    weekday: "short"
                });

            const card =
                document.createElement("article");

            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${dayName}</h4>
                <p class="forecast-temperature">
                    ${Math.round(day.main.temp)}°C
                </p>
                <p>${day.weather[0].description}</p>
            `;

            forecastContainer.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        forecastContainer.innerHTML =
            "<p>Forecast information unavailable.</p>";
    }
}


// ---------- BUSINESS SPOTLIGHTS ----------

async function getSpotlights() {

    const spotlightContainer =
        document.querySelector("#spotlights");

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                "Unable to retrieve member data."
            );
        }

        const members = await response.json();


        // Select only Gold and Silver members.

        const qualifiedMembers =
            members.filter(
                member =>
                    member.membership === 2 ||
                    member.membership === 3
            );


        // Randomize the qualified members.

        qualifiedMembers.sort(
            () => Math.random() - 0.5
        );


        // Select up to three members.

        const selectedMembers =
            qualifiedMembers.slice(0, 3);


        spotlightContainer.innerHTML = "";


        selectedMembers.forEach((member) => {

            const card =
                document.createElement("article");

            card.classList.add("spotlight-card");


            const membershipName =
                member.membership === 3
                    ? "Gold Member"
                    : "Silver Member";


            card.innerHTML = `
                <img
                    class="spotlight-logo"
                    src="${member.image}"
                    alt="${member.name} logo"
                    loading="lazy">

                <h3>${member.name}</h3>

                <span class="membership-level">
                    ${membershipName}
                </span>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p>${member.description}</p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        spotlightContainer.innerHTML =
            "<p>Business information unavailable.</p>";
    }
}


// ---------- RUN FUNCTIONS ----------

getCurrentWeather();
getForecast();
getSpotlights();