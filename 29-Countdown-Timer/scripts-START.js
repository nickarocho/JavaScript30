let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now(); //used to be const now = (new Date()).getTime();
    const then = now + seconds * 1000; //"now" = milliseconds, "seconds" = seconds... have to convert
    displayTimeLeft(seconds); //run immediately to show starting time
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    /* TIDBIT: Understanding Timestamps
     * Date.now() = 1480619897056... # of milliseconds since Jan 1, 1970
     * new Date(1480619897056) returns Dec 01 2016 14:18:17 GMT-0500(EST)
     * put that in a variable, like var x = new Date(Date.now()), you can call
     * things like x.getDay() returns 1, x.getMonth() returns 12, etc.
     */
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour > 12 ? hour -12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
/* TIDBIT: Custom Form Names
 * if a form has a [name="foo"] attribute, and the inputs within it also
 * have name attributes, you can select it by tacking it straight from the
 * document!!!
 */
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value; //.minutes comes from the input[name="minutes"] attribute!
    timer(mins * 60);
    this.reset(); // clears the value in the input
});
