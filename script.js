
const clock = document.getElementById("clock");
const day = document.getElementById("day");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");

const btn12 = document.getElementById("btn12");
const btn24 = document.getElementById("btn24");

let is24Hour = false;

// Update the digital clock
function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    let period = hours >= 12 ? "PM" : "AM";

    if (!is24Hour) {
        hours = hours % 12 || 12;
        clock.textContent =
            `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${period}`;
    } else {
        clock.textContent =
            `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
    }

    // Display day
    day.textContent = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    // Display date
    date.textContent = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    // Greeting
    const currentHour = now.getHours();

    if (currentHour < 12) {
        greeting.textContent = "Good Morning! ☀️";
    } else if (currentHour < 17) {
        greeting.textContent = "Good Afternoon! 🌤️";
    } else {
        greeting.textContent = "Good Evening! 🌙";
    }
}

// Change clock format
btn12.addEventListener("click", () => {
    is24Hour = false;
    btn12.classList.add("active");
    btn24.classList.remove("active");
    updateClock();
});

btn24.addEventListener("click", () => {
    is24Hour = true;
    btn24.classList.add("active");
    btn12.classList.remove("active");
    updateClock();
});

// Colour themes
const themes = {

    purple: {
        bg: "#100020",
        accent: "#c084fc",
        second: "#9333ea",
        text: "#ffffff"
    },

    blue: {
        bg: "#061a38",
        accent: "#60a5fa",
        second: "#2563eb",
        text: "#ffffff"
    },

    green: {
        bg: "#062b20",
        accent: "#4ade80",
        second: "#16a34a",
        text: "#ffffff"
    },

    pink: {
        bg: "#380d29",
        accent: "#f9a8d4",
        second: "#ec4899",
        text: "#ffffff"
    },

    orange: {
        bg: "#351605",
        accent: "#fb923c",
        second: "#ea580c",
        text: "#ffffff"
    },

    red: {
        bg: "#35070e",
        accent: "#fb7185",
        second: "#dc2626",
        text: "#ffffff"
    },

    black: {
        bg: "#080808",
        accent: "#facc15",
        second: "#737373",
        text: "#ffffff"
    },

    white: {
        bg: "#eeeeee",
        accent: "#2563eb",
        second: "#9333ea",
        text: "#111111"
    },

    maroon: {
        bg: "#35000c",
        accent: "#f87171",
        second: "#991b1b",
        text: "#ffffff"
    },

    darkblue: {
        bg: "#030b2b",
        accent: "#38bdf8",
        second: "#1d4ed8",
        text: "#ffffff"
    },

    yellow: {
        bg: "#332600",
        accent: "#fde047",
        second: "#eab308",
        text: "#ffffff"
    },

    teal: {
        bg: "#042d30",
        accent: "#2dd4bf",
        second: "#0d9488",
        text: "#ffffff"
    },

    indigo: {
        bg: "#11103b",
        accent: "#818cf8",
        second: "#4f46e5",
        text: "#ffffff"
    },

    cyan: {
        bg: "#002b35",
        accent: "#22d3ee",
        second: "#0891b2",
        text: "#ffffff"
    }

};

// Apply selected theme
function changeTheme(themeName) {

    const selected = themes[themeName];

    if (!selected) return;

    const root = document.documentElement;

    root.style.setProperty("--bg", selected.bg);
    root.style.setProperty("--accent", selected.accent);
    root.style.setProperty("--second", selected.second);
    root.style.setProperty("--text", selected.text);

    document.body.style.background =
        selected.bg;

    document.querySelector(".clock-container").style.background =
        selected.bg;

    document.querySelector(".header").style.background =
        `linear-gradient(120deg, ${selected.bg}, ${selected.second})`;

    document.querySelector("footer").style.background =
        `linear-gradient(120deg, ${selected.second}, ${selected.bg})`;

    document.querySelectorAll(".info-card").forEach(card => {
        card.style.background =
            `linear-gradient(135deg, ${selected.bg}, ${selected.second})`;
    });

    document.querySelector(".themes").style.background =
        selected.bg;
}

// Theme button clicks
document.querySelectorAll("[data-theme]").forEach(button => {

    button.addEventListener("click", () => {

        const themeName = button.dataset.theme;

        changeTheme(themeName);

    });

});

// Start clock
updateClock();

setInterval(updateClock, 1000);
