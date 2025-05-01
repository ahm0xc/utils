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

/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 *
 * @example
 * // Returns a random number between 1 and 10
 * randomInt(1, 10);
 *
 * @example
 * // Returns a random number between -5 and 5
 * randomInt(-5, 5);
 */
export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Splits an array into chunks of the specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to split into chunks.
 * @param {number} size - The size of each chunk.
 * @returns {T[][]} An array of chunks.
 *
 * @example
 * // Returns [[1, 2], [3, 4], [5]]
 * chunkArray([1, 2, 3, 4, 5], 2);
 *
 * @example
 * // Returns [['a', 'b', 'c'], ['d', 'e', 'f']]
 * chunkArray(['a', 'b', 'c', 'd', 'e', 'f'], 3);
 */
export const chunkArray = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

/**
 * Removes duplicate elements from an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to remove duplicates from.
 * @returns {T[]} A new array with unique elements.
 *
 * @example
 * // Returns [1, 2, 3]
 * uniqueArray([1, 2, 2, 3, 1]);
 *
 * @example
 * // Returns ['a', 'b', 'c']
 * uniqueArray(['a', 'b', 'a', 'c', 'b']);
 */
export const uniqueArray = <T>(arr: T[]): T[] => [...new Set(arr)];
