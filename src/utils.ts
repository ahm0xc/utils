/**
 * Creates a promise that resolves after a specified delay.
 *
 * @param {number} ms - The delay time in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 *
 * @example
 * // Wait for 1 second
 * await delay(1000);
 *
 * @example
 * // Use in an async function
 * async function example() {
 *   console.log('Start');
 *   await delay(2000); // Wait 2 seconds
 *   console.log('End after 2 seconds');
 * }
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} A new string with the first letter capitalized.
 *
 * @example
 * // Returns "Hello"
 * capitalize("hello");
 *
 * @example
 * // Returns "World"
 * capitalize("world");
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Checks if a value is empty.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is null, undefined, an empty string, an empty array, or an empty object.
 *
 * @example
 * // Returns true
 * isEmpty(null);
 * isEmpty(undefined);
 * isEmpty('');
 * isEmpty([]);
 * isEmpty({});
 *
 * @example
 * // Returns false
 * isEmpty('hello');
 * isEmpty([1, 2, 3]);
 * isEmpty({ key: 'value' });
 */
export const isEmpty = (value: any): boolean =>
  value == null ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0);
