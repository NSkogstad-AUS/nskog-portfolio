/**
 * This is the behavior for the navigation, Fetching navigation data, wiring events
 * Also renders.attaches the navbar.html fragment
 * Think of the dynamic states, clicks and toggles (this is .js whereas HTML is the structure)
 * 
 * navbar.js
 * - Loads the static markup from navbar.html
 * - Loads nav items from navigation.json
 * - Injects both into the page and wires up basic behavior (mobile toggle)
 *
 * Communication between files:
 *   - navbar.html: supplies the structural skeleton.
 *   - navigation.json: supplies data for labels/links.
 *   - navbar.css: styles the elements once they are in the DOM.
 *   - app.js: calls renderNavbar to mount the component into the page.
 */

const NAV_TEMPLATE_URL = "./components/navbar.html";

/**
 * Render the navbar into the given target element.
 * @param {Object} options
 * @param {HTMLElement|null} options.target - Where to place the navbar (e.g., document.querySelector("header"))
 * @param {string} options.configUrl - Path to the JSON file with nav data
 */
export async function renderNavbar({ target, configUrl }) {
    if (!target) {
        console.warn("Navbar: no target provided, nothing to render.");
        return;
    }

    // Load template markup and nav data in parallel.
    const [templateHTML, navData] = await Promise.all([
        fetch(NAV_TEMPLATE_URL).then((res) => res.text()),
        fetch(configUrl).then((res) => res.json()),
    ]);

    // Insert the HTML skeleton into the page.
    target.innerHTML = templateHTML;

    const navEl = target.querySelector(".navbar");
    const brandSlot = navEl?.querySelector("[data-slot='brand']");
    const linksSlot = navEl?.querySelector("[data-slot='links']");
    const toggleButton = navEl?.querySelector(".navbar__toggle");

    // Populate brand text (falls back to a generic label).
    if (brandSlot) {
        brandSlot.textContent = navData?.brand || "Brand";
    }

    // Populate links from JSON data.
    if (linksSlot && Array.isArray(navData?.links)) {
        linksSlot.innerHTML = "";
        navData.links.forEach((item) => {
            const li = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.href = item.href;
            anchor.textContent = item.label;
            li.appendChild(anchor);
            linksSlot.appendChild(li);
        });
    }

    // Basic mobile toggle behavior (adds a class the CSS can react to).
    if (toggleButton && navEl) {
        toggleButton.addEventListener("click", () => {
            const isOpen = navEl.classList.toggle("is-open");
            toggleButton.setAttribute("aria-expanded", String(isOpen));
        });
    }
}
