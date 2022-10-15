const CONSOLE_BOOL = true;

/**
 * Class representing an Event Hub to centralize all event logic
 */
class EventBus {

    /**
     * Constructs a new EventBus, by obtaining references to all major webcomponents
     * and registering events
     */
    constructor() {
        this.o_bus = document.createElement("div");
        this.o_welcome = document.querySelector("welcome-box");
        this.registerEvents();
    }

    /**
     * Registers all of the events that will be fired
     */
    registerEvents() {
        this.registerEvent("closeWindows", this.handleCloseWindows.bind(this));
        this.registerEvent("showWelcome", this.handleShowWelcome.bind(this));
    }


    /**
     * Registers the event of the specified name
     * @param {String} s_event_name name to fire off
     * @param {Function} f_callback callback function to call
     */
    registerEvent(s_event_name, f_callback) {
        this.o_bus.addEventListener(s_event_name, f_callback);
    }

    /**
     * Fires the specified event
     * @param {String} s_event_name 
     */
    fireEvent(s_event_name) {
        this.o_bus.dispatchEvent(new CustomEvent(s_event_name));
    }


    /**
     * Event Handler function for the 'closeWindows' event
     */
    handleCloseWindows() {
        this.o_welcome.closeWelcome();
    }

    /**
     * Event Handler function for the 'showTasks' event
     */
    handleShowWelcome() {
        this.o_welcome.showWelcomeBox();
        if (CONSOLE_BOOL) {
            console.log("eventBus.js - handleShowWelcome");
        }
    }

}

export { EventBus };