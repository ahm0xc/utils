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

/**
 * Calculates the sum of all numbers in an array.
 *
 * @param {number[]} arr - The array of numbers to sum.
 * @returns {number} The sum of all numbers in the array.
 *
 * @example
 * // Returns 6
 * sumArray([1, 2, 3]);
 *
 * @example
 * // Returns 0
 * sumArray([-5, 5]);
 */
export const sumArray = (arr: number[]): number =>
  arr.reduce((sum, num) => sum + num, 0);

/**
 * Shuffles the elements of an array using the Fisher-Yates algorithm.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to shuffle.
 * @returns {T[]} A new array with shuffled elements.
 *
 * @example
 * // Returns a shuffled version of the array
 * shuffleArray([1, 2, 3, 4, 5]);
 *
 * @example
 * // Returns a shuffled version of the array
 * shuffleArray(['a', 'b', 'c', 'd']);
 */
export const shuffleArray = <T>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i]!, copy[j]!] = [copy[j]!, copy[i]!];
  }
  return copy;
};

/**
 * Type representing the result of a try-catch operation.
 * Either contains a successful result [data, null] or an error [null, error].
 *
 * @template T - The type of the successful result.
 * @template E - The type of the error, defaults to Error.
 */
export type TryCatchResult<T, E = Error> = [T, null] | [null, E];

/**
 * Safely executes a promise and returns a tuple containing either the result or an error.
 * This utility helps avoid try-catch blocks throughout the codebase.
 *
 * @template T - The type of the successful result.
 * @template E - The type of the error, defaults to Error.
 * @param {Promise<T>} promise - The promise to execute.
 * @returns {Promise<TryCatchResult<T, E>>} A promise that resolves to a tuple containing either [data, null] or [null, error].
 *
 * @example
 * // Handle API request without try-catch
 * const [data, error] = await tryCatch(fetchUserData(userId));
 * if (error) {
 *   console.error('Failed to fetch user data:', error);
 *   return;
 * }
 * // Use data safely
 * console.log(data);
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<TryCatchResult<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}

/**
 * Retrieves a favicon URL for a given domain using Google's favicon service.
 *
 * @param {string} domainName - The domain name to get the favicon for (e.g., 'example.com').
 * @param {Object} options - Configuration options.
 * @param {number} [options.size=32] - The size of the favicon in pixels (16, 32, 64, etc.).
 * @returns {string} The URL to the favicon image.
 *
 * @example
 * // Get default size (32px) favicon for https://example.com
 * const favicon = getFavicon('https://example.com');
 *
 * @example
 * // Get a 64px favicon for https://github.com
 * const largeFavicon = getFavicon('https://github.com', { size: 64 });
 */
export const getFavicon = (
  url: string,
  options: { size?: number } = {},
): string => {
  const size = options.size || 32;
  try {
    const origin = new URL(url).origin;
    return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=${size}`;
  } catch (error) {
    return "";
  }
};

/**
 * Checks if a string is a valid URL.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is a valid URL, false otherwise.
 *
 * @example
 * // Check if a string is a valid URL
 * const isValidUrl = isUrl('https://example.com'); // true
 *
 * @example
 * // Check if a string is not a valid URL
 * const isValidUrl = isUrl('not a url'); // false
 */
export const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Truncates a string to a specified maximum length and adds a suffix if truncated.
 *
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the string before truncation.
 * @param {string} [suffix="..."] - The suffix to add to the truncated string.
 * @returns {string} The truncated string with suffix if applicable.
 *
 * @example
 * // Truncate a long string
 * const truncated = truncateString('This is a very long string', 10); // 'This is a...'
 *
 * @example
 * // Truncate with custom suffix
 * const truncated = truncateString('This is a very long string', 10, ' [more]'); // 'This is a [more]'
 *
 * @example
 * // String shorter than maxLength remains unchanged
 * const unchanged = truncateString('Short', 10); // 'Short'
 */
export const truncateString = (
  str: string,
  maxLength: number,
  suffix: string = "...",
): string => {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}${suffix}`;
};

/**
 * Validates if a string is a valid email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 *
 * @example
 * // Check if an email is valid
 * const isValid = isValidEmail('user@example.com'); // true
 *
 * @example
 * // Check if an email is invalid
 * const isValid = isValidEmail('invalid-email'); // false
 */
export const isValidEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Creates a new object with only the specified keys from the original object.
 *
 * @param {T} obj - The source object to pick properties from.
 * @param {K[]} keys - An array of keys to select from the object.
 * @returns {Pick<T, K>} A new object containing only the specified keys.
 *
 * @example
 * // Pick specific properties from an object
 * const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
 * const userBasics = pick(user, ['id', 'name']); // { id: 1, name: 'John' }
 *
 * @example
 * // Keys that don't exist in the original object are ignored
 * const result = pick({ a: 1, b: 2 }, ['a', 'c']); // { a: 1 }
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return keys.reduce(
    (result, key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = obj[key];
      }
      return result;
    },
    {} as Pick<T, K>,
  );
};
