import { WelcomeBox } from "./welcomeBox.js";
import { EventBus } from "./eventBus.js";

const CONSOLE_BOOL = true;
let characterJumpingBoolean = false;
let scrollTimer = -1;
const characterOutfits = ["education", "projects", "skills", "contact"];
let touchstartX = 0;
let touchendX = 0;
let swipingBoolean = false;



function showDropdown(event) {
    // Necessary for the document NOT to trigger closeMenu
    event.stopPropagation();
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

function closeMenu() {
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

    // Code to automatically open welcome message if it is the user's first time on the site
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let date = new Date();
    let currDate = date.getDay() + (date.getMonth() * daysInMonth[date.getMonth()]) + 
        (date.getFullYear() * 365);
    let prevDate = localStorage.getItem("prevDate");
    // Set prevDate to know when user last visited the site
    localStorage.setItem("prevDate", currDate);

    //Trigger loading animation only once per day
    if (prevDate != currDate) {
        let loading_duration = 7500; //500 larger than "loading-row-animation" duration in CSS
        document.body.classList.add("loading-open");
        setTimeout(function() {
            loadingFinish();
        }, loading_duration);
    } 
    // Don't trigger loading animation
    else {
        setTimeout(function() {
            loadingFinish();
        }, 100);
    }

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
        threshold: .85,
        rootMargin: "-5%",
    });

    // Observe each element sliding in
    let slides = document.querySelectorAll(".slide-in");
    slides.forEach(slide => {
        display_observer.observe(slide);
    });
    // Observe each element fading in
    let fades = document.querySelectorAll(".fade-in");
    fades.forEach(fade => {
        display_observer.observe(fade);
    })

    // Intersection Observer for block appear effects
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

    // Observe each element with the block-appear effect
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
    o_menu_btn.addEventListener("click", function(event){ showDropdown(event)} );
    // Hide dropdown if the document is clicked
    document.addEventListener("click", closeMenu);

    // Buttons to go forward and back through images
    let o_scroll_prev = document.getElementById("scroll-prev");
    let o_scroll_next = document.getElementById("scroll-next");
    o_scroll_prev.addEventListener("click", previousImage);
    o_scroll_next.addEventListener("click", nextImage);

    
    let image_card_cover = document.querySelector(".image-card-cover");
    image_card_cover.addEventListener("click", function(){ displayScrollingImageArt()} );
    
    let art_full_backs = document.querySelectorAll(".art_full_wrapper_background");
    art_full_backs.forEach(art_full_back => {
        art_full_back.addEventListener("click", function(){ closeFullArt(art_full_back)} );
    });


    // Code for automatically cycling through artworks
    //imageTransitions();

    // Code to make introduction do a pulse when hovered
    let landing_card = document.getElementById("landing-id");
    let letters = landing_card.querySelectorAll(".bounce");
    for (let i = 0; i < letters.length; i++) {
        letters[i].addEventListener("mouseenter", glowPulse(i, letters));
    }

    
}


function displayScrollingImageArt() {
    console.log("clicked");
    let image_cards = document.querySelectorAll(".image-card");
    image_cards.forEach(card => {
        if (card.classList.contains("displayed")) {
            let art_full_id = card.id.split("-")[0] + "-full-wrapper";
            console.log(art_full_id)
            let art_full_wrapper = document.getElementById(art_full_id);
            art_full_wrapper.classList.add("displayed");
            document.body.classList.add("art-display-open");
        }
    });
}

/**
 * Functions specific for initializing the home page
 */
 function resumePageStarter(event) {
    document.body.classList.add("loading-open");
    //Making the loading animation grid disappear
    setTimeout(function() {
        loadingResumeShrink();
    }, 3200);
    
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
    }, 600);
}

function resumeLoaded() {
    window.addEventListener("keyup", userKeyResume);
    let character_cover = document.querySelector(".character-cover");
    character_cover.addEventListener("click", characterJump);
    document.addEventListener("wheel", parallaxScroll);
    let remove_outfits_btn = document.querySelector(".resume-outfit-btn");
    remove_outfits_btn.addEventListener("click", removeOutfits);
    document.addEventListener('touchmove', detectSwipe); 

    // Intersection Observer for classes that need to add display
    let content_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("displayed", entry.isIntersecting);
            if (entry.isIntersecting) content_observer.unobserve(entry.target);
        });
    }, {
        threshold: .2
    });
    
    let contents = document.querySelectorAll(".resume-content-wrapper");
    contents.forEach(content => {
        content_observer.observe(content);
    });
}

function detectSwipe(event) {
    touchstartX = event.changedTouches[0].screenX;
    if (swipingBoolean) return;
    swipingBoolean = true;
    setTimeout(function() {
        touchendX = event.changedTouches[0].screenX;
        let distanceX = touchendX - touchstartX;
        parallaxSwipe(distanceX);
        swipingBoolean = false;
    }, 10);
}

function parallaxSwipe(distance) {
    let character = document.querySelector(".character");
    let character_cover = document.querySelector(".character-cover");
    if ((distance < 0) && character.classList.contains("right")) {
        character.classList.remove("right");
        character.classList.add("left");
        character_cover.classList.remove("right");
        character_cover.classList.add("left");
    }
    else if ((distance > 0) && character.classList.contains("left")) {
        character.classList.remove("left");
        character.classList.add("right");
        character_cover.classList.remove("left");
        character_cover.classList.add("right");
    }
    if (character.classList.contains("jump")) return;
    character.classList.add("walk");
    character_cover.classList.add("walk");
    if (scrollTimer != -1) { clearTimeout(scrollTimer); }
    scrollTimer = window.setTimeout(function() {
        character.classList.remove("walk");
        character_cover.classList.remove("walk");
        if (CONSOLE_BOOL) { console.log("done scrolling"); }
    }, 300);
}

function parallaxScroll(event) {
    let parallax = document.querySelector(".parallax-wrapper");
    parallax.scrollLeft += event.deltaY;
    let character = document.querySelector(".character");
    let character_cover = document.querySelector(".character-cover");
    if ((event.deltaY < 0) && character.classList.contains("right")) {
        character.classList.remove("right");
        character.classList.add("left");
        character_cover.classList.remove("right");
        character_cover.classList.add("left");
    }
    else if ((event.deltaY > 0) && character.classList.contains("left")) {
        character.classList.remove("left");
        character.classList.add("right");
        character_cover.classList.remove("left");
        character_cover.classList.add("right");
    }
    if (character.classList.contains("jump")) return;
    if (event.deltaY == 0) return;
    character.classList.add("walk");
    character_cover.classList.add("walk");
    if (scrollTimer != -1) { clearTimeout(scrollTimer); }
    scrollTimer = window.setTimeout(function() {
        character.classList.remove("walk");
        character_cover.classList.remove("walk");
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
    let character_cover = document.querySelector(".character-cover");
    if (character.classList.contains("walk")) {
        character.classList.remove("walk");
        character_cover.classList.remove("walk");
    }
    let dogs = document.querySelectorAll(".dog");
    dogs.forEach(dog => {
        dog.classList.add("jump");
    });
    character.classList.add("jump");
    character_cover.classList.add("jump");
    //Checks halfway through jump at the heighest point because all blocks are that high up
    setTimeout(function() {
        checkBlockHit();
    }, 375); //MUST be half of jump animation duration
    setTimeout(function() {
        //Reset to be ready to jump again
        character_cover.classList.remove("jump");
        character.classList.remove("jump");
        dogs.forEach(dog => {
            dog.classList.remove("jump");
        });
        characterJumpingBoolean = false;
    }, 750); //SHOULD match jump animation duration
}



function checkBlockHit() {
    if (CONSOLE_BOOL) {console.log("...Checking If Block Hit...");}
    let blocks = document.querySelectorAll(".resume-header-block");
    let character_cover = document.querySelector(".character-cover");
    let character = document.querySelector(".character");
    let characterRect = character.getBoundingClientRect();
    blocks.forEach(block => {
        if (!block.classList.contains("active")) {
            let blockRect = block.getBoundingClientRect();
            //Check if character is in the bounds of the block when he's at the top of his jump
            if ((characterRect.right - 20 > blockRect.left) && (characterRect.left + 20 < blockRect.right)) {
                if (CONSOLE_BOOL) {console.log("BLOCK HIT!!!");}
                //Make all blocks not be hit
                blocks.forEach(block => { 
                    block.classList.remove("active");
                });
                //Make this block be hit
                block.classList.add("active");
                //Activate remove outfit button once a block has been hit
                let remove_outfits_btn = document.querySelector(".resume-outfit-btn");
                remove_outfits_btn.classList.remove("disabled");
                remove_outfits_btn.tabIndex = 0;
                let new_outfit = block.id.split("-")[0];
                //Make the cover appear over the character
                character_cover.classList.add("changing");
                //Function to make the character change outfit once it is covered
                setTimeout(function() {
                    //Remove classes for all outfits
                    characterOutfits.forEach(outfit => {
                        character.classList.remove(outfit);
                    })
                    //Add class for new outfit
                    character.classList.add(new_outfit);
                }, 300); //MUST be greater than change outfit animation delay
                //Function for removing change outfit animation
                setTimeout(function() {
                    character_cover.classList.remove("changing");
                }, 1200); //Matches the pickup icon (resume-header-block::before) animation duration
            }
        }
    });
}

function removeOutfits() {
    let remove_outfits_btn = document.querySelector(".resume-outfit-btn");
    if (remove_outfits_btn.classList.contains("disabled")) return;
    let blocks = document.querySelectorAll(".resume-header-block");
    let character = document.querySelector(".character");
    let character_cover = document.querySelector(".character-cover");
    remove_outfits_btn.classList.add("disabled");
    remove_outfits_btn.tabIndex = -1;
    //Make the cover appear over the character
    character_cover.classList.add("changing");
    //Make all blocks not be hit
    blocks.forEach(block => { 
        block.classList.remove("active");
    });
    //Function to make the character remove outfits once it is covered
    setTimeout(function() {
        //Remove classes for all outfits
        characterOutfits.forEach(outfit => {
            character.classList.remove(outfit);
        })
    }, 300); //MUST be greater than change outfit animation delay
    //Function for removing change outfit animation
    setTimeout(function() {
        character_cover.classList.remove("changing");
    }, 600); //Matches the pickup icon (resume-header-block::before) animation duration

}

/**
 * Functions specific for initializing the projects page
 */
 function projectsPageStarter(event) {
    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", function(event){ showDropdownProjects(event)} );
    // Hide dropdown if the document is clicked
    document.addEventListener("click", function(){ closeDropdownProjects()} );

    
    // Intersection Observer for classes that need to add display
    let display_observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("displayed", entry.isIntersecting);
            let bubble_id = "project-tab-bubble-" + entry.target.id.split("-").pop();
            let bubble = document.getElementById(bubble_id);
            bubble.classList.toggle("displayed", entry.isIntersecting);
        });
    }, {
        threshold: .4,
    });

    let wrappers = document.querySelectorAll(".project-tab-wrapper");
    wrappers.forEach(wrapper => {
        display_observer.observe(wrapper);
    });
 }

 function showDropdownProjects(event) {
    // Necessary for the document NOT to trigger closeMenu
    event.stopPropagation();
    let dropdown = document.querySelector(".dropdown");
    let menu_list = document.querySelector(".menu-list");
    let menu_button = document.querySelector(".menu-btn");
    let bubble_wrapper = document.querySelector(".project-tab-bubble-wrapper");
    if (dropdown.classList.contains("displayed")) {
        menu_list.classList.remove("displayed");        
        setTimeout(function() {
            menu_button.classList.remove("clicked");
            menu_button.title = "Show Menu";
            dropdown.classList.remove("displayed");
            bubble_wrapper.classList.remove("menu-open");
        }, 200);
    }
    else {
        menu_button.classList.add("clicked");
        menu_button.title = "Hide Menu";
        dropdown.classList.add("displayed");
        bubble_wrapper.classList.add("menu-open");
        setTimeout(function() {
            menu_list.classList.add("displayed");
        }, 400);
    }
}

function closeDropdownProjects(event) {
    let dropdown = document.querySelector(".dropdown");
    let menu_list = document.querySelector(".menu-list");
    let menu_button = document.querySelector(".menu-btn");
    let bubble_wrapper = document.querySelector(".project-tab-bubble-wrapper");
    if (dropdown.classList.contains("displayed")) {
        menu_list.classList.remove("displayed");        
        setTimeout(function() {
            menu_button.classList.remove("clicked");
            menu_button.title = "Show Menu";
            dropdown.classList.remove("displayed");
            bubble_wrapper.classList.remove("menu-open");
        }, 200);
    }
}


/**
 * Functions specific for initializing the art page
 */
 function artPageStarter(event) {
    // Call function to create the custom dropdown to filter art
    createArtDropdown();
    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", function(event){ 
        showDropdown(event);
        closeArtDropdown();
    } );
    // Hide dropdown if the document is clicked
    document.addEventListener("click", closeMenu);
    // Code for closing dropdown to filter art
    document.addEventListener("click", closeArtDropdown);

    let art_previews = document.querySelectorAll(".art-preview-wrapper");
    art_previews.forEach(preview => {
        preview.addEventListener("click", function(){ displayFullArt(preview)} );
    });

    let art_full_backs = document.querySelectorAll(".art_full_wrapper_background");
    art_full_backs.forEach(art_full_back => {
        art_full_back.addEventListener("click", function(){ closeFullArt(art_full_back)} );
    });

 }

function createArtDropdown() {
    // Grab menu dropdown to close it if clicking on art dropdown
    let dropdown = document.querySelector(".dropdown");
    // Grab the custom dropdown menu
    let dropdown_top = document.querySelector(".art-dropdown-top");
    let dropdown_options_old = dropdown_top.getElementsByTagName("select")[0];
    /* Create the selected option */
    let dropdown_option_selected = document.createElement("div");
    dropdown_option_selected.classList.add("option-selected");
    dropdown_option_selected.innerHTML = dropdown_options_old.options[dropdown_options_old.selectedIndex].innerHTML;
    dropdown_option_selected.id = dropdown_options_old.options[dropdown_options_old.selectedIndex].innerHTML.toLowerCase();
    dropdown_top.appendChild(dropdown_option_selected);
    /* Create the options wrapper */
    let dropdown_options_new = document.createElement("div");
    dropdown_options_new.classList.add("art-dropdown", "hidden");
    let new_option;
    for (let j = 0; j < dropdown_options_old.length; j++) {
        // Create each option
        new_option = document.createElement("div");
        new_option.innerHTML = dropdown_options_old.options[j].innerHTML;
        // Make the first option start selected
        if (j == 0) { new_option.classList.add("already-selected"); }
        // Add eventlistener for clicking an option
        new_option.addEventListener("click", function() {
            // Update displayed selected option information
            dropdown_option_selected.innerHTML = this.innerHTML;
            dropdown_option_selected.id = this.innerHTML.toLowerCase();
            // Function to filter the displayed artworks
            updateArtDisplay();
            // Remove "already selected" class from other options
            this.parentNode.getElementsByClassName("already-selected")[0].classList.remove("already-selected");
            // Add "already selected" class to this option
            this.classList.add("already-selected");
            // Close the dropdown
            dropdown_option_selected.click();
        });
        // Append each option to the options wrapper
        dropdown_options_new.appendChild(new_option);
    }
    // Append options wrapper to the original dropdown menu
    dropdown_top.appendChild(dropdown_options_new);
    // Add eventlistener for opening/closing the art dropdown when clicking on the displayed selected option/arrow
    dropdown_option_selected.addEventListener("click", function(e) {
        // Prevent document from firing closeArtDropdown
        e.stopPropagation();
        // Close Menu Dropdown if it is open when clicking on the art dropdown
        if (dropdown.classList.contains("displayed")) { closeMenu(); }
        // Open/Close Art Dropdown
        this.nextSibling.classList.toggle("hidden");
        // Indicate the dropdown is open/closed to alter down/up arrow
        this.classList.toggle("open");
    });
}


/* A function that will close all select boxes in the document,
  except the current select box: */
function closeArtDropdown() {
  let dropdown_options_new = document.querySelector(".art-dropdown");
  let dropdown_option_selected = document.querySelector(".option-selected");
  dropdown_option_selected.classList.remove("open");
  dropdown_options_new.classList.add("hidden");
}

function updateArtDisplay() {
    let filter = document.querySelector(".option-selected").id;
    let art_prev_wrappers = document.getElementsByClassName("art-preview-wrapper");
    // Make all visible
    for (let i = 0; i < art_prev_wrappers.length; i++) {
        art_prev_wrappers[i].classList.remove("hidden");
    }
    // Stop if showing all artworks
    if (filter == "all artworks") { return; }
    // Hide the artworks not matching the filter
    for (let i = 0; i < art_prev_wrappers.length; i++) {
        if (!art_prev_wrappers[i].classList.contains(filter)) {
            art_prev_wrappers[i].classList.add("hidden");
        }
    }
}

function displayFullArt(art_preview) {
    let art_full_id = art_preview.id.split("-")[0] + "-full-wrapper";
    let art_full_wrapper = document.getElementById(art_full_id);
    art_full_wrapper.classList.add("displayed");
    document.body.classList.add("art-display-open");
}

function closeFullArt(art_full_back) {
    let art_full_wrapper_id = art_full_back.id.split("-")[0] + "-" + art_full_back.id.split("-")[1] + "-" + art_full_back.id.split("-")[2];
    let art_full_wrapper = document.getElementById(art_full_wrapper_id);
    art_full_wrapper.classList.remove("displayed");
    document.body.classList.remove("art-display-open");
}


/**
 * Functions specific for initializing the projects page
 */
 function aboutPageStarter(event) {
    // Code for showing / hiding menu functionality
    let o_menu_btn = document.querySelector(".menu-btn");
    o_menu_btn.addEventListener("click", function(event){ showDropdown(event)} );
    // Hide dropdown if the document is clicked
    document.addEventListener("click", closeMenu);
    setInterval(function() { 
        document.querySelector(".about-img-top").classList.toggle("disappear");
    }, 7500);
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
    }
    // initialize Event Bus instance
    document.EventBus = new EventBus();

});