// This file is used for page-level bootstrap imports/initalises components to assemble the page
import {renderNavbar} from "./components/navbar.js";

renderNavbar({target: document.querySelector("header"), configUrl: "./data/navigation.json"});