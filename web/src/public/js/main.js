import { MenuList } from "./menuList.js";
import { EventBus } from "./eventBus.js";


// /**
//  * Event handler function to change the theme
//  */
// function handleThemeBtnPressed() {
//     // Obtains an array of all <link> elements. Select your element using indexing. 
//     let theme = document.getElementById("theme");
//     let theme_btn = document.getElementById("theme-btn");

//     // Change the value of href attribute to change the css sheet.
//     if (theme.getAttribute("href") == "./css/colors.css") {
//         theme.setAttribute("href", "./css/colors2.css");
//         theme_btn.setAttribute("title", "Simple Theme");
//     } else {
//         theme.setAttribute("href", "./css/colors.css");
//         theme_btn.setAttribute("title", "Complex Theme");
//     }
// }

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

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});