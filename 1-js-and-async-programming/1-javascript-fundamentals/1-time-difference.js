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
    if(b>a){//ensure A is always greater than B or equal
        [b,a] = [a,b];
    }
    let differenceInSeconds = a-b;
    let hours = Math.trunc(differenceInSeconds/3600);//get total hours
    differenceInSeconds %= 3600;
    let minutes = Math.trunc(differenceInSeconds/60);//get total minutes
    differenceInSeconds%=60;
    let seconds = differenceInSeconds;//get seconds
    //place a 0 where needed
    let textualHours = hours<10?"0"+hours.toString():hours.toString();
    let textualMinutes = minutes<10?"0"+minutes.toString():minutes.toString();
    let textualSeconds = seconds<10?"0"+seconds.toString():seconds.toString();
    return `${textualHours}:${textualMinutes}:${textualSeconds}`;//concatenate results with : as separator
};

module.exports = timeDifference;
