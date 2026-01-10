/*
Challenge 1

"Time difference calculator"

The function timeDifference accepts two positive numbers representing time in seconds. You should modify the function to return the difference between the two times in a human-readable format HH:MM:SS.

Requirements:
- The function should accept two positive numbers representing time in seconds.
- The function should return the absolute difference between the two times.
- The result should be formatted as HH:MM:SS.

Example:

timeDifference(7200, 3400); // Expected output: "01:03:20"

*/

const timeDifference = (a, b) => {

    let result = "";
    
    // Find difference
    let difference = Math.abs(a - b);

    // Convert to hours
    let timeHours = difference / 3600;
    result = Math.trunc(timeHours) + ":";

    // Convert to minutes
    let timeHoursFraction = timeHours - Math.trunc(timeHours);
    let timeMinutes = timeHoursFraction * 60;
    result += Math.trunc(timeMinutes) + ":";

    // Convert to seconds
    let timeMinutesFraction = timeMinutes - Math.trunc(timeMinutes);
    let timeSeconds = Math.round(timeMinutesFraction * 60);
    result += Math.trunc(timeSeconds);

    // Format time
    let formattedTime = result.split(":").map(p => p.padStart(2, "0")).join(":");
    
    return formattedTime;
};

module.exports = timeDifference;