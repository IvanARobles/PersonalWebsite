
/**
 * Custom HTML element encapsulating all of the functionality related to the Menu List
 * @extends HTMLElement
 */
class MenuList extends HTMLElement {
    /**
     * Constructs a new Menu Display, initializing all elements and adding handlers
     */
    constructor() {
        super();
        this.o_menu = {};

        // background mask
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("sidenav-blocker", "hidden");
        o_wrapper_obj_back.id = "side-menu-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeMenuList.bind(this));

        // side menu
        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "sidenav";
        o_wrapper_obj.id = "side-menu";

        // close button
        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close", "btn", "hidden");
        o_close_button.id = "close-menu";
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeMenuList.bind(this));
        
        o_wrapper_obj.append(o_close_button);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }


    /**
     * Function to show menu list display from the main user screen
     */
    showMenuList() {
        //document.addEventListener("DOMContentLoaded", () => {
            console.log("loaded");

            this.querySelector("#close-menu").style.display = "block";
            let o_menu = this.querySelector("#side-menu");
            o_menu.style.display = "block";

            if (window.screen.width <= 500) {
                o_menu.classList.add("sidenav-small");
            } else {
                o_menu.classList.add("sidenav-open");
            }

            // Remove everything during animation to prevent sandwiching of text
            setTimeout(() => {
                //this.querySelector("#menu-title").style.display = "block";
                //this.querySelector("#all-menu").style.display = "block";
                //this.querySelector("input").focus();
            }, 200);

            this.querySelector("#side-menu-blocker").style.display = "block";

        //});
        
    }

    /**
     * Function to close menu list display from the main user screen
     */
    closeMenuList() {
        this.querySelector("#close-menu").style.display = "none";
        let o_menu = this.querySelector("#side-menu");

        o_menu.classList.remove("sidenav-small");
        o_menu.classList.remove("sidenav-open");
        //this.querySelector("#menu-title").style.display = "none";
        //this.querySelector("#all-menu").style.display = "none";
        this.querySelector("#side-menu-blocker").style.display = "none";
    }

}


customElements.define("menu-list", MenuList);
export { MenuList }