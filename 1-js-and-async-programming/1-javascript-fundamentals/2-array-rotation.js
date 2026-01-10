/*
Challenge 2

"Array rotation"
Given an array of numbers and a positive integer n, write a function that rotates the array n positions clockwise.

Requirements:
- The function should handle arrays of any length.
- The array should be rotated in a clockwise direction.
- The rotation should wrap around, meaning the elements at the end of the array should move to the beginning.
- The function should handle cases where n is greater than the length of the array.
- The function should return the rotated array.

Example:
rotateArray([1, 2, 3, 4, 5], 2); // Expected output: [3, 4, 5, 1, 2]
rotateArray([1, 2, 3, 4, 5], 7); // Expected output: [3, 4, 5, 1, 2]

*/

const rotateArray = (arr, n) => {
    let result = [];
    let length = arr.length;

    if (length === 0)
    {
        return [];
    }

    // Maximum number of rotations is array.length
    n = n % length;

    for (let index = n; index < length; index++)
    {
        result.push(arr[index]);
    }

    for (let index = 0; index < n; index++)
    {
        result.push(arr[index]);
    }

    console.log(result[4]);
    console.log(arr[0]);

    console.log(result);
    console.log(arr);

    return result;
};

rotateArray([1, 2, 3, 4, 5], 6);

module.exports = rotateArray;
