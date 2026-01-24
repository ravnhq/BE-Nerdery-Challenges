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

    // Find difference
    let difference = Math.abs(a - b);

    // Convert to hours
    let hours = Math.trunc(difference / 3600);
    let leftover = difference - (hours * 3600);

    // Convert to minutes
    let minutes = Math.trunc(leftover / 60);

    // Convert to seconds
    let seconds = leftover - (minutes * 60);

    let time = [hours, minutes, seconds];

    // Format time
    let formattedTime = time.map(unit => {
        return String(unit).padStart(2, "0");
    });

    return formattedTime.join(":");
}

module.exports = timeDifference;