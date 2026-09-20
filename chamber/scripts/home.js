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
   WEATHER
========================= */

const API_KEY = "1c753bcebdd85f9d7cdda3da50d061f6";

const weatherIcon = document.querySelector("#weatherIcon");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weatherDescription");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const forecastContainer = document.querySelector("#forecastContainer");

const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=Lagos,NG&units=metric&appid=${API_KEY}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=Lagos,NG&units=metric&appid=${API_KEY}`;


async function getCurrentWeather() {
    if (!temperature) return;

    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();

        temperature.textContent = Math.round(data.main.temp);

        weatherDescription.textContent =
            data.weather[0].description.replace(/\b\w/g, letter =>
                letter.toUpperCase()
            );

        humidity.textContent = data.main.humidity;

        windSpeed.textContent =
            Math.round(data.wind.speed * 3.6);

        if (weatherIcon) {
            weatherIcon.src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            weatherIcon.alt =
                data.weather[0].description;
        }

    } catch (error) {
        console.error("Unable to load current weather:", error);

        temperature.textContent = "--";
        weatherDescription.textContent =
            "Weather information unavailable.";
        humidity.textContent = "--";
        windSpeed.textContent = "--";
    }
}


async function getForecast() {
    if (!forecastContainer) return;

    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error(`Forecast request failed: ${response.status}`);
        }

        const data = await response.json();

        const dailyForecasts = [];

        for (const item of data.list) {
            const forecastDate = new Date(item.dt * 1000);

            const dateKey = forecastDate.toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            );

            const hour = forecastDate.getHours();

            if (
                hour >= 11 &&
                hour <= 13 &&
                !dailyForecasts.some(
                    forecast => forecast.dateKey === dateKey
                )
            ) {
                dailyForecasts.push({
                    dateKey: dateKey,
                    date: forecastDate,
                    temperature: item.main.temp,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                });
            }

            if (dailyForecasts.length === 3) {
                break;
            }
        }

        forecastContainer.innerHTML = "";

        dailyForecasts.forEach(forecast => {
            const article = document.createElement("article");

            article.className = "forecast-card";

            article.innerHTML = `
                <h4>
                    ${forecast.date.toLocaleDateString("en-US", {
                        weekday: "long"
                    })}
                </h4>

                <img
                    src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png"
                    alt="${forecast.description}"
                    width="60"
                    height="60"
                >

                <p>
                    <strong>
                        ${Math.round(forecast.temperature)}°C
                    </strong>
                </p>

                <p>
                    ${forecast.description.replace(/\b\w/g, letter =>
                        letter.toUpperCase()
                    )}
                </p>
            `;

            forecastContainer.appendChild(article);
        });

    } catch (error) {
        console.error("Unable to load forecast:", error);

        forecastContainer.innerHTML =
            "<p>Forecast information unavailable.</p>";
    }
}


/* =========================
   BUSINESS SPOTLIGHTS
========================= */

const spotlightContainer =
    document.querySelector("#spotlightContainer");

async function getSpotlights() {
    if (!spotlightContainer) return;

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`Member request failed: ${response.status}`);
        }

        const members = await response.json();

        const qualifiedMembers = members.filter(
            member =>
                Number(member.membershipLevel) === 2 ||
                Number(member.membershipLevel) === 3
        );

        const shuffled = [...qualifiedMembers].sort(
            () => Math.random() - 0.5
        );

        const selectedMembers = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {

            const article = document.createElement("article");

            article.className = "spotlight-card";

            const membership =
                Number(member.membershipLevel) === 3
                    ? "Gold Member"
                    : "Silver Member";

            article.innerHTML = `
                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    width="300"
                    height="150"
                    loading="lazy"
                >

                <h3>${member.name}</h3>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membership}
                </p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>
            `;

            spotlightContainer.appendChild(article);
        });

    } catch (error) {
        console.error("Unable to load spotlights:", error);

        spotlightContainer.innerHTML =
            "<p>Business spotlights are unavailable.</p>";
    }
}


getCurrentWeather();
getForecast();
getSpotlights();