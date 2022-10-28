import { WelcomeBox } from "./welcomeBox.js";
import { EventBus } from "./eventBus.js";

const CONSOLE_BOOL = true;
let characterJumpingBoolean = false;
let scrollTimer = -1;


function showDropdown() {
    let dropdown = document.querySelector(".dropdown");
    let menu_list = document.querySelector(".menu-list");
    let menu_button = document.querySelector(".menu-btn")
    if (dropdown.classList.contains("displayed")) {
        menu_list.classList.remove("displayed");        
        setTimeout(function() {
            menu_button.classList.remove("clicked");
            menu_button.title = "Show Menu";
            dropdown.classList.remove("displayed");
        }, 200);
    }
    else {
        menu_button.classList.add("clicked");
        menu_button.title = "Hide Menu";
        dropdown.classList.add("displayed");
        setTimeout(function() {
            menu_list.classList.add("displayed");
        }, 400);
    }
}


/**
 * Function to save checkbox to stop showing the welcome box
 */
 function welcomeBoxClosed(event) {
    if (document.getElementById("welcome-checkbox").checked) {
        localStorage.setItem("welcomeBoolean", true);
    }
    welcomeAnimations();
}

/**
 * Function to start the main page animations
 */
 function welcomeAnimations(event) {
    //enable scrolling by removing loading-open class from body
    document.body.classList.remove("loading-open");
    if (CONSOLE_BOOL) {
        console.log("welcome animations starting");
    }
    // Code for header waving with color
    let index_header = document.getElementById("index-header");
    index_header.addEventListener("click", clickColorWave, { once: true } );
    index_header.click();

    // Code for introduction appearing after wave
    let landing_card = document.getElementById("landing-id");
    setTimeout( function() {
        landing_card.classList.add("displayed");
        showFooter();
    }, 200);
}

function previousImage() {
    let img_array = this.parentNode.querySelector("ul");
    let img_displayed = img_array.querySelector(".displayed");
    let index = [...img_array.children].indexOf(img_displayed) - 1;
    if (index < 0) index = img_array.children.length - 2;//TWO because it has a cover
    img_displayed.classList.remove("displayed");
    img_array.children[index].classList.add("displayed");
}

function nextImage() {
    let img_array = this.parentNode.querySelector("ul");
    let img_displayed = img_array.querySelector(".displayed");
    let index = [...img_array.children].indexOf(img_displayed) + 1;
    if (index >= img_array.children.length - 1) index = 0;//-ONE because it has a cover
    img_displayed.classList.remove("displayed");
    img_array.children[index].classList.add("displayed");
}
/**
 * Function to constantly change the artwork previewed on the main page
 */
function imageTransitions() {
    let all_transitions = setInterval(function() { 
        document.getElementById("scroll-next").click();
    }, 6000);
    //Use clearInterval(all_transitions) to pause the cycle
}

/**
 * Function to make the main header wave ONCE
 */
 function clickColorWave(event) {
    if (CONSOLE_BOOL) {
        console.log("wave for header.id = ", event.target.id);
    }
    let header_id = document.getElementById(event.target.id);
    let letters = header_id.getElementsByTagName("span");
    setTimeout(function() {    
        colorRightLetter(0, letters.length, letters);
    }, 1000); //Delay of INITIAL wave
}

const WAVE_SPEED = 100; //The speed of the wave used by colorWave
const PULSE_SPEED = 75; //The speed of the pulse used by glowPulse

/**
 * Function to recursively add and remove color from a letter
 */
 function colorRightLetter(currIdx, length, letters) {
    //Base case: stop when we pass the last letter of the word
    if (currIdx < length) {
        letters[currIdx].classList.add("colored");
        setTimeout(function() {
            letters[currIdx].classList.remove("colored");
            currIdx++;
            colorRightLetter(currIdx, length, letters)
        }, WAVE_SPEED); //THE SPEED OF THE WAVE
    } else return;
}

/**
 * Function to make the letters of a sentence glow like a pulse, starting on the letter hovered
 */
 function glowPulse(idx, letters) {
    return function() {
        if (CONSOLE_BOOL) {
            console.log("color pulse starting on: ", letters[idx].innerHTML);
        }
        let prevIdx = idx - 1;
        let nextIdx = idx + 1;
        // Add glow to one letter then remove it and start left and right
        letters[idx].classList.add("glow");
        setTimeout(function() {
            letters[idx].classList.remove("glow");
            glowLeftLetter(prevIdx, letters);
            glowRightLetter(nextIdx, letters.length, letters);
        }, PULSE_SPEED)
    };
}

/**
 * Function to recursively add and remove glow from a letter to the right of the current
 */
function glowRightLetter(currIdx, length, letters) {
    //Base case: stop when we pass the last letter of the word
    if (currIdx < length) {
        letters[currIdx].classList.add("glow");
        setTimeout(function() {
            letters[currIdx].classList.remove("glow");
            currIdx++;
            glowRightLetter(currIdx, length, letters)
        }, PULSE_SPEED); //THE SPEED OF THE WAVE
    } else return;
}

/**
 * Function to recursively add and remove glow from a letter to the left of the current
 */
 function glowLeftLetter(currIdx, letters) {
    //Base case: stop when we reach the first letter of the word
    if (currIdx >= 0) {
        letters[currIdx].classList.add("glow");
        setTimeout(function() {
            letters[currIdx].classList.remove("glow");
            currIdx--;
            glowLeftLetter(currIdx, letters)
        }, PULSE_SPEED); //THE SPEED OF THE WAVE
    } else return;
}

/**
 * Function to show second phrase of landing
 * note: only used a function to chain setTimeout
 */
function showFooter() {
    let landing_card_footer = document.getElementById("landing-footer-id");
        setTimeout( function() {
            landing_card_footer.classList.add("displayed");
        }, 2000);
}


        
function welcomeScroll(event) {
    let scroll_amount = event.deltaY;
    let currentHue = document.body.style.getPropertyValue("--scroll-text-hue");
    let newHue = (+currentHue + +scroll_amount)%360;
    document.body.style.setProperty("--scroll-text-hue", newHue);
}
        
function welcomeKeyUp(event) {
    let currentHue = document.body.style.getPropertyValue("--scroll-text-hue");
    let newHue = (+currentHue - 10)%360;
    document.body.style.setProperty("--scroll-text-hue", newHue);
}
        
function welcomeKeyDown(event) {
    let currentHue = document.body.style.getPropertyValue("--scroll-text-hue");
    let newHue = (+currentHue + 10)%360;
    document.body.style.setProperty("--scroll-text-hue", newHue);
}


function userKeying(event){
    let welcome = document.querySelector("welcome-box");
    if(event.key == "ArrowUp" && welcome.getIsShown()) {
        welcomeKeyUp();
    }
    if(event.key == "ArrowDown" && welcome.getIsShown()) {
        welcomeKeyDown();
    }
}
       

function loadingFinish() {
    let loading_section = document.querySelector(".loading-section");
    loading_section.classList.remove("displayed");
    welcomeStart();
}

function welcomeStart() {
    console.log("in welcome start")
    let welcome = document.querySelector("welcome-box");
    let welcomeBoolean = localStorage.getItem("welcomeBoolean");
    // Show welcome box if user has not selected to never see it again
    if (welcomeBoolean == null){
        if (CONSOLE_BOOL) {
            console.log("Showing Welcome Box");
        }
        setTimeout( function() {
            welcome.showWelcomeBox();
        }, 100); //small delay to look better
    }
    // Start welcome animations if user has previously selected not to see the welcome box again
    else welcomeAnimations();
}

/**
 * Functions specific for initializing the home page
 */
function homePageStarter(event) {
    let loading_duration = 7500; //500 larger than "loading-row-animation" duration in CSS
    document.body.classList.add("loading-open");
    //Making the loading section rows appear
    setTimeout(function() {
        loadingFinish();
    }, loading_duration);

    // Code to automatically open welcome message if it is the user's first time on the site
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let date = new Date();
    let currDate = date.getDay() + (date.getMonth() * daysInMonth[date.getMonth()]) + 
        (date.getFullYear() * 365);
    let prevDate = localStorage.getItem("prevDate");
    // Set prevDate to know when user last visited the site
    localStorage.setItem("prevDate", currDate);

    //initialize scroll effect color to green
    document.body.style.setProperty("--scroll-text-hue", "120");

    // Start welcome animations and possibly save welcomeBoolean if user closes welcome box
    let close_window_button = document.getElementById("close-welcome");
    close_window_button.addEventListener("click", welcomeBoxClosed);
    let close_window_blocker = document.getElementById("welcome-blocker");
    close_window_blocker.addEventListener("click", welcomeBoxClosed);

    // Intersection Observer for classes that need to add display
    let display_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("displayed", entry.isIntersecting);
            if (entry.isIntersecting) display_observer.unobserve(entry.target);
        });
    }, {
        threshold: .95,
        rootMargin: "-5%",
    });
    let slides = document.querySelectorAll(".slide-in");
    slides.forEach(slide => {
        display_observer.observe(slide);
    });
    let fades = document.querySelectorAll(".fade-in");
    fades.forEach(fade => {
        display_observer.observe(fade);
    })

    //Intersection Observer for block appear effects
    let block_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("covered", entry.isIntersecting);
            entry.target.classList.toggle("displayed", entry.isIntersecting);
            if (entry.isIntersecting) {
                setTimeout( function() {
                    entry.target.classList.remove("covered");
                }, 900); //Speed of block disappearing, match in css
                block_observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 1,
        rootMargin: "-2%",
    });
    let blocks = document.querySelectorAll(".block-text");
    blocks.forEach(block => {
        block_observer.observe(block);
    });

    let welcome_modal = document.getElementById("welcome");
    welcome_modal.addEventListener("wheel", welcomeScroll);
    let welcome_blocker = document.getElementById("welcome-blocker");
    welcome_blocker.addEventListener("wheel", welcomeScroll);
    window.addEventListener("keyup", userKeying);

    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", showDropdown);


    // Buttons to go forward and back through images
    let o_scroll_prev = document.getElementById("scroll-prev");
    let o_scroll_next = document.getElementById("scroll-next");
    o_scroll_prev.addEventListener("click", previousImage);
    o_scroll_next.addEventListener("click", nextImage);

    // Code for automatically cycling through artworks
    //imageTransitions();

    // Code to make introduction do a pulse when hovered
    let landing_card = document.getElementById("landing-id");
    let letters = landing_card.querySelectorAll(".bounce");
    for (let i = 0; i < letters.length; i++) {
        letters[i].addEventListener("mouseenter", glowPulse(i, letters));
    }

    
}


/**
 * Functions specific for initializing the home page
 */
 function resumePageStarter(event) {
    document.body.classList.add("loading-open");
    //Making the loading animation grid disappear
    setTimeout(function() {
        loadingResumeShrink();
    }, 4000);
    
}


function loadingResumeShrink() {
    let loading_grid = document.querySelector(".resume-load-grid");
    loading_grid.classList.add("shrink");
    //After the loading section rows have appeared plus a pause
    setTimeout(function() {
        loadingResumeDisappear();
    }, 800);
}

function loadingResumeDisappear() {
    let loading_section = document.querySelector(".resume-load-wrapper");
    loading_section.classList.remove("displayed");
    let loading_grid = document.querySelector(".resume-load-grid");
    loading_grid.style.display = "none";
    document.body.classList.remove("loading-open");
    //After the loading section rows have appeared plus a pause
    setTimeout(function() {
        resumeLoaded();
    }, 800);
}

function resumeLoaded() {
    window.addEventListener("keyup", userKeyResume);
    let character = document.querySelector(".character");
    character.addEventListener("click", characterJump);
    document.addEventListener("wheel", parallaxScroll);
}

function parallaxScroll(event) {
    // console.log("deltaY is ", event.deltaY);
    // console.log("deltaX is ", event.deltaX);
    let parallax = document.querySelector(".parallax-wrapper");
    parallax.scrollLeft += event.deltaY;
    let character = document.querySelector(".character");
    if ((event.deltaY < 0) && character.classList.contains("right")) {
        character.classList.remove("right");
        character.classList.add("left");
    }
    else if ((event.deltaY > 0) && character.classList.contains("left")) {
        character.classList.remove("left");
        character.classList.add("right");
    }
    if (character.classList.contains("jump")) return;
    if (event.deltaY == 0) return;
    character.classList.add("walk");
    if (scrollTimer != -1) { clearTimeout(scrollTimer); }
    scrollTimer = window.setTimeout(function() {
        character.classList.remove("walk");
        if (CONSOLE_BOOL) { console.log("done scrolling"); }
    }, 300);
}

function userKeyResume(event) {
    if(event.key == " ") {
        if (CONSOLE_BOOL) {console.log("space pressed");}
        if (scrollTimer != -1) { clearTimeout(scrollTimer); }
        characterJump();
    }
}

function characterJump() {
    //Don't continue if the character is already jumping
    if (characterJumpingBoolean) return;
    characterJumpingBoolean = true;
    let character = document.querySelector(".character");
    if (character.classList.contains("walk")) {
        character.classList.remove("walk");
    }
    let dogs = document.querySelectorAll(".dog");
    dogs.forEach(dog => {
        dog.classList.add("jump");
    });
    
    character.classList.add("jump");
    setTimeout(function() {
        //Reset to be ready to jump again
        character.classList.remove("jump");
        dogs.forEach(dog => {
            dog.classList.remove("jump");
        });
        characterJumpingBoolean = false;
    }, 750);
}


/**
 * Functions specific for initializing the projects page
 */
 function projectsPageStarter(event) {
    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", showDropdown);
 }


/**
 * Functions specific for initializing the projects page
 */
 function artPageStarter(event) {
    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", showDropdown);
 }

/**
 * Functions specific for initializing the projects page
 */
 function aboutPageStarter(event) {
    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", showDropdown);
 }

/**
 * Functions specific for initializing the projects page
 */
 function contactPageStarter(event) {
    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", showDropdown);
 }



/**
 * This event listener is used for initializing anything that isn't associated with any specific webcomponent.
 */
document.addEventListener("DOMContentLoaded", () => {
    if (CONSOLE_BOOL) {
        console.log("main.js - DOM loaded");
    }

    //Grab the current html page name
    let html_page = window.location.pathname.split("/").pop();
    if (CONSOLE_BOOL) {
        if (html_page == "") console.log("current page: home page");
        else console.log("current page: ", html_page);
    }
    //Only for the main landing page
    if (html_page == "") {
        homePageStarter();
    } else if ( html_page == "visual-resume") {
        resumePageStarter();
    } else if ( html_page == "projects") {
        projectsPageStarter();
    } else if ( html_page == "art") {
        artPageStarter();
    } else if ( html_page == "about") {
        aboutPageStarter();
    } else if ( html_page == "contact") {
        contactPageStarter();
    }
    
    // initialize Event Bus instance
    document.EventBus = new EventBus();

});