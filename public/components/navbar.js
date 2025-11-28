/**
 * This is the behavior for the navigation, Fetching navigation data, wiring events
 * Also renders.attaches the navbar.html fragment
 * Think of the dynamic states, clicks and toggles (this is .js whereas HTML is the structure)
 */

const NAV_TEMPLATE_URL = "./components/navbar.html";

/**
 * Render the navbar into the given target element.
 * @param {Object} options
 * @param {HTMLElement|null} options.target
 * @param {string} options.configUrl
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

    const locationSlot = navEl?.querySelector("[data-slot='location']");
    const formatPath = (pathname) => pathname.replace(/\/+$/, "") || "/";
    const buildCrumbs = (pathname) => {
        const parts = pathname.split("/").filter(Boolean);
        return ["~", ...parts];
    };

    // Populate brand text
    if (brandSlot) {
        brandSlot.textContent = navData?.brand || "Brand";
    }

    // For determining the level we're at
    if (locationSlot) {
        const crumbs = buildCrumbs(window.location.pathname);
        locationSlot.innerHTML = "";
        crumbs.forEach((part, idx) => {
            const span = document.createElement("span");
            span.className = "navbar__crumb" + (idx === crumbs.length - 1 ? " is-active" : "");
            span.textContent = part;
            locationSlot.appendChild(span);
            if (idx < crumbs.length - 1) {
                const divider = document.createElement("span");
                divider.className = "navbar__divider";
                divider.textContent = "/";
                locationSlot.appendChild(divider);
            }
        });
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
}
