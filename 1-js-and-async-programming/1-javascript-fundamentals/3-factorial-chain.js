/*
Challenge 3

"Factorial Chain"

The function factorialChain accepts two arguments: length and lastDigits.

The length tells you how many numbers to include in the series, and your job is to calculate the factorial of each number from 1 to length, then sum all those factorials.

lastDigits indicates how many digits from the end of the final sum should be returned, as a string.

Example:

factorialChain(5, 3); // Expected output: "153"
factorialChain(5, 1); // Expected output: "3
factorialChain(5,5); // Expected output: "00153"

1! = 1  
2! = 2  
3! = 6  
4! = 24  
5! = 120  
Total = 153 

Requirements:
- The function should accept two positive integers.
- The first integer (length) should represent the number of terms in the series.
- The second integer (lastDigits) should represent how many digits from the end of the final sum should be returned.
- The function should return the lastDigits digits of the sum as a string.
- In case the sum has fewer digits than lastDigits, the function should return the sum padded with leading zeros to match the length of lastDigits.

*/

const factorialChain = (number, lastDigits) => {
    function factorial(n){//factorial implementation
        let numbers = Array.from(Array(n).keys());
        return numbers.reduce((sum, current) => sum * (current+1), 1);
    }

    function factorialSum(n){//factorial sum implementation as a reduction
        let numbers = Array.from(Array(n).keys());
        return numbers.reduce((sum, current) => sum + factorial(current+1), 0);
    }

    let sum=factorialSum(number).toString(); 
    
    //modifying the sum string acording to lastDigits
    if(lastDigits==sum.length){
        return sum;
    }else if(lastDigits<sum.length){
        return sum.slice(-lastDigits);
    }
    else{
        let extra0s = lastDigits-sum.length;
        let filledWith0 = "0".repeat(extra0s);
        return filledWith0+sum;
    }
};

module.exports = factorialChain;
