import { MenuList } from "./menuList.js";
import { EventBus } from "./eventBus.js";

const CONSOLE_BOOL = true;

/**
 * Event handler function to show MenuList when menu button is pressed
 */
function showMenuList() {
    document.EventBus.fireEvent("showMenu");
}

/**
 * This event listener is used for initializing anything that isn't associated with any specific webcomponent.
 */
document.addEventListener("DOMContentLoaded", () => {

    // Code for showing / hiding MenuList functionality
    let o_menu_btn = document.getElementById("menu-btn");
    o_menu_btn.addEventListener("click", showMenuList);
    
    if (CONSOLE_BOOL) {
        console.log("main.js - DOM loaded");
    }

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});