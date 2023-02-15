$(".stopwatch-btn").click(function(){
    //Hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // Show stopwatch wrappers
    $(".stopwatch").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

$(".back-btn").click(function(){
    //Hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // Show stopwatch wrappers
    $(".clock").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});

$(".timer-btn").click(function(){
    //Hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    // Show stopwatch wrappers
    $(".timer").slideDown();
    //update type text
    $(".type").html("Stopwatch");
});



function displayTime() {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var ampm = document.getElementById('ampm');

    if (hrs >= 12) {
        ampm.innerHTML = 'PM';
    }
    else {
        ampm.innerHTML = 'AM';
    }

    if (hrs > 12) {
        hrs = hrs - 12;
    }
}

setInterval(displayTime, 10);




const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    // Converting 24 hours to 12 hours
    hours = hours % 12 || 12;

    //add Trailing zero if less than 10
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hours").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);

};

// Call the function on page load
updateTime();

// call function after every second
setInterval(updateTime, 1000);



// StopWatch

let stopwatchHours = 0,
    stopwatchMinutes = 0,
    StopwatchSeconds = 0,
    StopwatchMiliSeconds = 0,
    StopwatchRunning = false,
    // laps = 0,
    StopWatchInterval;

const stopwatch = () => {
    //Increase milisecond by one
    StopwatchMiliSeconds++;

    if (StopwatchMiliSeconds == 100) {
        //if stopwatch milisecond equal 100 increase 1 sec and set ms 0.
        StopwatchSeconds++;
        StopwatchMiliSeconds = 0;
    }

    if (StopwatchSeconds == 60) {
        stopwatchMinutes++;
        StopwatchSeconds = 0;
    }

    if (stopwatchMinutes == 60) {
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    // Show values on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(StopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(StopwatchMiliSeconds));

};

//Function to start stopwatch
const startStopwatch = () => {
    if (!StopwatchRunning) {
        // If stop watch is not currently runnning
        StopWatchInterval = setInterval(stopwatch, 10);
        StopwatchRunning = true;
    }
};

// Function to stop stopwatch
const stopStopwatch = () => {
    clearInterval(StopWatchInterval);
    StopwatchRunning = false;
};

//reset stopwatch function
const resetStopwatch = () => {
    //clear interval and set all value to default
    clearInterval(StopWatchInterval);
    stopwatchHours = 0,
        stopwatchMinutes = 0,
        StopwatchSeconds = 0,
        StopwatchMiliSeconds = 0,
        StopwatchRunning = false,
        laps = 0;

    //Update values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");

};



//Start the stop-watch by click
$(".start-stopwatch").click(function () {
    startStopwatch();
    //hide the start button show the lap button
    // $(".start-stopwatch").hide();
    // $(".start-stopwatch").show();
}
);

// Reset the stopwatch
$(".reset-stopwatch").click(function () {
    resetStopwatch();
})


 // Timer
let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTime = () => {
    time = prompt("Enter time in minutes");

    //convert time in seconds
    time = time * 60;

    //update timer dafault
    setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);
    timerMiliseconds = 0;
    //Show user entered time on document 
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
};

const timer = () => {
    timerMiliseconds--;
    if (timerMiliseconds == -1) {
        timerMiliseconds = 99;
        timerSeconds--;
    }

    if (timerSeconds == -1) {
        timerSeconds = 59;
        timerMinutes--;
    }

    if (timerMinutes == -1) {
        timerMinutes = 59;
        timerHours--;
    }

    //Update time
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));

    //check time up on every interval
    timeUp();
};

const startTimer = () => {
    //Before starting check if the valid time is given or not.
    if (timerHours == 0 &&
        timerMinutes == 0 &&
        timerSeconds == 0 &&
        timerMiliseconds == 0) {
        //if all values are zero then get time
        getTime();
    } else {
        //Start Timer
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").hide();
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
};

const timeUp = () => {
    if (
        timerHours == 0 &&
        timerMinutes == 0 &&
        timerSeconds == 0 &&
        timerMiliseconds == 0) {
            resetTimer();
            alert("Time's up");
            
    }
}

$(".start-timer").click(function () {
    startTimer();
});

$(".stop-timer").click(function () {
    stopTimer();
});

$(".reset-timer").click(function () {
    resetTimer();
});

