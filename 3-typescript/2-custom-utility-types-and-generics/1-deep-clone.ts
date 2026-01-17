/**
 * Challenge: Create a deep clone function
 *
 * Create a function that takes an object and returns a deep clone of that object. The function should handle nested objects, arrays, and primitive types.
 *
 * Requirements:
 * - The function should accept an object of any type.
 * - It should return a new object that is a deep clone of the original object.
 * - The function should handle nested objects and arrays.
 * - It should handle primitive types (strings, numbers, booleans, null, undefined).
 * - The function should not use any external libraries
 */

// implement the function  here
function deepClone(object: any): any
{
  // Base case: if it's null or not an object, return the value directly
  if (object === null || typeof object !== "object")
  {
    return object;
  }

  // If it's an array, clone each element recursively
  if (Array.isArray(object))
  {
    return object.map(deepClone);
  }

  // If it's an object, create a new empty object
  const clonedObject: any = {};

  // Loop through each property in the object
  for (let key in object)
  {
    if (object.hasOwnProperty(key))
    {
      clonedObject[key] = deepClone(object[key]);
    }
  }

  return clonedObject;
}