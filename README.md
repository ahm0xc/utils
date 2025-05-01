# @ahm0xc/utils

A collection of utility functions for JavaScript and TypeScript projects.

## Installation

```bash
npm install @ahm0xc/utils
```

## Table of Contents

- [API Reference](#api-reference)
  - [delay](#delayms-number-promisevoid)
  - [capitalize](#capitalizestr-string-string)
  - [isEmpty](#isemptyvalue-any-boolean)
  - [randomInt](#randomintmin-number-max-number-number)
  - [chunkArray](#chunkarrayarr-t-size-number-t)
  - [uniqueArray](#uniquearrayarr-t-t)
  - [sumArray](#sumarrayarr-number-number)
  - [shuffleArray](#shufflearrayarr-t-t)
- [Usage Examples](#usage-examples)
- [License](#license)

## API Reference

### delay(ms: number): Promise\<void\>

Creates a promise that resolves after a specified delay.

**Parameters:**

- `ms` - The delay time in milliseconds.

**Returns:**

- A promise that resolves after the specified delay.

**Example:**

```typescript
import { delay } from "@ahm0xc/utils";

// Wait for 1 second
await delay(1000);
```

### capitalize(str: string): string

Capitalizes the first letter of a string.

**Parameters:**

- `str` - The string to capitalize.

**Returns:**

- A new string with the first letter capitalized.

**Example:**

```typescript
import { capitalize } from "@ahm0xc/utils";

// Returns "Hello"
capitalize("hello");
```

### isEmpty(value: any): boolean

Checks if a value is empty.

**Parameters:**

- `value` - The value to check.

**Returns:**

- Returns true if the value is null, undefined, an empty string, an empty array, or an empty object.

**Example:**

```typescript
import { isEmpty } from "@ahm0xc/utils";

// Returns true
isEmpty(null);
isEmpty(undefined);
isEmpty("");
isEmpty([]);
isEmpty({});

// Returns false
isEmpty("hello");
isEmpty([1, 2, 3]);
isEmpty({ key: "value" });
```

### randomInt(min: number, max: number): number

Generates a random integer between min and max (inclusive).

**Parameters:**

- `min` - The minimum value (inclusive).
- `max` - The maximum value (inclusive).

**Returns:**

- A random integer between min and max.

**Example:**

```typescript
import { randomInt } from "@ahm0xc/utils";

// Returns a random number between 1 and 10
randomInt(1, 10);
```

### chunkArray(arr: T[], size: number): T[][]

Splits an array into chunks of the specified size.

**Parameters:**

- `arr` - The array to split into chunks.
- `size` - The size of each chunk.

**Returns:**

- An array of chunks.

**Example:**

```typescript
import { chunkArray } from "@ahm0xc/utils";

// Returns [[1, 2], [3, 4], [5]]
chunkArray([1, 2, 3, 4, 5], 2);
```

### uniqueArray(arr: T[]): T[]

Removes duplicate elements from an array.

**Parameters:**

- `arr` - The array to remove duplicates from.

**Returns:**

- A new array with unique elements.

**Example:**

```typescript
import { uniqueArray } from "@ahm0xc/utils";

// Returns [1, 2, 3]
uniqueArray([1, 2, 2, 3, 1]);
```

### sumArray(arr: number[]): number

Calculates the sum of all numbers in an array.

**Parameters:**

- `arr` - The array of numbers to sum.

**Returns:**

- The sum of all numbers in the array.

**Example:**

```typescript
import { sumArray } from "@ahm0xc/utils";

// Returns 6
sumArray([1, 2, 3]);
```

### shuffleArray(arr: T[]): T[]

Shuffles the elements of an array using the Fisher-Yates algorithm.

**Parameters:**

- `arr` - The array to shuffle.

**Returns:**

- A new array with shuffled elements.

**Example:**

```typescript
import { shuffleArray } from "@ahm0xc/utils";

// Returns a shuffled version of the array
shuffleArray([1, 2, 3, 4, 5]);
```

## License

See [LICENSE](./LICENSE) file for details.
