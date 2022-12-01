
/**
 * Custom HTML element encapsulating all of the functionality related to the Intructions Box
 * @extends HTMLElement
 */
 class WelcomeBox extends HTMLElement {

    /**
     * Constructs a new Welcome Box, initializing all elements
     */
    constructor() {
        super();
        // most of this content is simply initializing the html to go in the webcomponent
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("welcome-section-blocker");
        o_wrapper_obj_back.id = "welcome-blocker";
        o_wrapper_obj_back.style.display = "none";
        o_wrapper_obj_back.addEventListener("click", this.closeWelcome.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.classList.add("welcome-section");
        o_wrapper_obj.id = "welcome";

        let o_welc_title_wrapper = document.createElement("div");
        o_welc_title_wrapper.className = "hidden";
        o_welc_title_wrapper.id = "welcome-title";

        //Welcome Box header
        let o_welc_title = document.createElement("h1");
        o_welc_title.className = "welcome-head";
        o_welc_title.innerText = "Hey there!";

        let o_welc_text = document.createElement("div");
        o_welc_text.className = "hidden";
        o_welc_text.id = "welcome-para";

        //Initial greeting for readers
        let o_welc_greet = document.createElement("p");
        let o_welc_greet_0 = document.createElement("span");
        o_welc_greet_0.innerText = WelcomeBox.S_WELC_MSG[0];

        let o_welc_greet_1 = document.createElement("span");
        o_welc_greet_1.innerText = WelcomeBox.S_WELC_MSG[1];
        o_welc_greet_1.classList.add("text-medium", "italicized-text");

        let o_welc_greet_2 = document.createElement("span");
        o_welc_greet_2.innerText = WelcomeBox.S_WELC_MSG[2];

        let o_welc_greet_3 = document.createElement("span");
        o_welc_greet_3.innerText = WelcomeBox.S_WELC_MSG[3];
        o_welc_greet_3.classList.add("color-scroll-effect");
        o_welc_greet_3.id = "welcome-scroll-id";
        o_welc_greet_3.title = "Scroll Up or Down!";

        let o_welc_greet_4 = document.createElement("span");
        o_welc_greet_4.innerText = WelcomeBox.S_WELC_MSG[4];

        let o_welc_greet_5 = document.createElement("span");
        o_welc_greet_5.innerText = WelcomeBox.S_WELC_MSG[5];
        o_welc_greet_5.classList.add("welcome-hover-effect");
        o_welc_greet_5.id = "welcome-hover-id";
        o_welc_greet_5.title = "Hover or Focus on Me!";
        o_welc_greet_5.tabIndex = "0";

        let o_welc_greet_6 = document.createElement("span");
        o_welc_greet_6.innerText = WelcomeBox.S_WELC_MSG[6];

        let o_welc_greet_7 = document.createElement("span");
        o_welc_greet_7.innerText = WelcomeBox.S_WELC_MSG[7];
        o_welc_greet_7.classList.add("click-ripple-effect");
        o_welc_greet_7.id = "welcome-click-id";
        o_welc_greet_7.title = "Click on Me!";
        o_welc_greet_7.addEventListener("click", this.addClicked.bind(o_welc_greet_7));
        o_welc_greet_7.tabIndex = "0";

        let o_welc_greet_8 = document.createElement("span");
        o_welc_greet_8.innerText = WelcomeBox.S_WELC_MSG[8];

        o_welc_greet.append(o_welc_greet_0, o_welc_greet_1, o_welc_greet_2, o_welc_greet_3, o_welc_greet_4);
        o_welc_greet.append(o_welc_greet_5, o_welc_greet_6, o_welc_greet_7, o_welc_greet_8);

        let final_note = document.createElement("p");
        final_note.classList.add("welcome-note");
        final_note.innerText = WelcomeBox.NOTE_MSG[0];
        let note_link = document.createElement("a");
        note_link.classList.add("underline-link-swipe");
        note_link.innerText = WelcomeBox.NOTE_MSG[1];
        note_link.href = "pages/visual-resume.html";
        note_link.target = "_blank";
        note_link.title = "Open Interactive Resume"
        final_note.append(note_link);

        //Buttons
        let button_wrapper = document.createElement("div");
        button_wrapper.classList.add("welcome-button-wrapper");
        button_wrapper.id = "welcome-buttons";

        //Don't show welcome box again option
        let first_button = document.createElement("span");
        first_button.classList.add("div-center", "hidden-checkbox-wrapper");
        let o_welc_checkbox = document.createElement("input");
        o_welc_checkbox.setAttribute("type", "checkbox");
        o_welc_checkbox.classList.add("not-displayed");
        o_welc_checkbox.id = "welcome-checkbox";
        let o_welc_label = document.createElement("label");
        o_welc_label.setAttribute("for", "welcome-checkbox");
        o_welc_label.innerText = WelcomeBox.CHECKBOX_MSG;
        o_welc_label.classList.add("btn-welcome", "displayed");
        o_welc_label.id = "welcome-label";
        o_welc_label.tabIndex = 0;
        first_button.append(o_welc_checkbox, o_welc_label);

        //The close "button"
        let second_button = document.createElement("span");
        second_button.classList.add("div-center");
        let o_welc_close_text = document.createElement("label");
        o_welc_close_text.innerText = WelcomeBox.CLOSE_MSG;
        o_welc_close_text.classList.add("btn-welcome", "displayed");
        o_welc_close_text.id = "close-welcome";
        o_welc_close_text.tabIndex = 0;
        o_welc_close_text.addEventListener("click", this.closeWelcome.bind(this));
        second_button.append(o_welc_close_text);

    
        button_wrapper.append(first_button, second_button);
        o_welc_title_wrapper.append(o_welc_title);
        o_welc_text.append(o_welc_greet, final_note, button_wrapper);
        o_wrapper_obj.append(o_welc_title_wrapper, o_welc_text);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }

    /** Function to determine if the welcome is currently shown */
    getIsShown() {
        return this.querySelector("#welcome").classList.contains("displayed");
    }

    /**
     * Function to show task list display from the main user screen
     */
    showWelcomeBox() {
        document.body.classList.add("welcome-open");
        this.querySelector("#welcome").classList.add("displayed");
        this.querySelector("#welcome-title").style.display = "block";
        this.querySelector("#welcome-para").style.display = "block";
        document.body.focus();

        let welc_block = this.querySelector("#welcome-blocker");
        welc_block.style.display = "block";
        setTimeout(function() {
            welc_block.classList.add("displayed");
        }, 50);
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeWelcome() {
        document.body.classList.remove("welcome-open");
        this.querySelector("#welcome").classList.remove("displayed");
        let welc_title = this.querySelector("#welcome-title");
        let welc_para = this.querySelector("#welcome-para");
        let welc_block = this.querySelector("#welcome-blocker");
        welc_block.classList.remove("displayed");
        // Hide everything inside welcome box after animating
        setTimeout(function() {
            welc_title.style.display = "none";
            welc_para.style.display = "none";
            welc_block.style.display = "none";
            document.body.focus();
        }, 1100); //MATCH with transition time in CSS
    }
    /**
     * Function to add and remove the "clicked" class
     */
    addClicked() {
        let element = this;
        element.classList.add("clicked");
        setTimeout(function() {
            element.classList.remove("clicked");
        }, 500);
    }
}

/**
 * String of welcome to users - the first thing they will read
 * @static
 * @type {string[]}
 */
WelcomeBox.S_WELC_MSG = ["I am a software engineer (namely UI/UX), and this website was made so you can learn a little bit about me and my work. " +
    "I chose to hand-code this website using HTML5, CSS3, and JavaScript ", 
    "(i.e. no frameworks)", 
    ". This means everything you see was custom-made. So please", 
    "scroll,",
    "", 
    "\xa0hover,\xa0",
    "and", 
    "\xa0click\xa0",
    "around everything on the website; you might find some fun effects!"];

/**
 * String describing the final note of the welcome box
 * @static
 * @type {String}
 */
 WelcomeBox.NOTE_MSG = ["P.S. I recommend checking out the ",
    "interactive\xa0resume!"];

/**
 * String describing the checkbox of the welcome box
 * @static
 * @type {String}
 */
 WelcomeBox.CHECKBOX_MSG = "Don't Show This Again";

/**
 * String describing the close button of the welcome box
 * @static
 * @type {String}
 */
WelcomeBox.CLOSE_MSG = "Close Welcome Pop-Up";


customElements.define("welcome-box", WelcomeBox);


export { WelcomeBox }