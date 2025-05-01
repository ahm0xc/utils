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
- [DOM Utilities](#dom-utilities)
  - [select](#selectselector-string-parent-elementdocument-element--null)
  - [selectAll](#selectallselector-string-parent-elementdocument-element)
  - [createElement](#createelementtag-string-attributes-record-children-stringelement-htmlelement)
  - [addEventListeners](#addeventlistenersselector-stringelementelement-event-string-callback-function-options-object-function)
  - [toggleClass](#toggleclasselement-element-classname-string-force-boolean-boolean)
  - [dataAttr](#dataattrelement-element-key-string-value-string-stringnullvoid)
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

## DOM Utilities

DOM manipulation utilities are accessible via the `dom` namespace:

```typescript
import { dom } from "@ahm0xc/utils";

// Use DOM utilities
const element = dom.select("#app");
```

### select(selector: string, parent?: Element|Document): Element | null

Selects an element from the DOM.

**Parameters:**

- `selector` - CSS selector for the element.
- `parent` - Parent element to search within. Defaults to document.

**Returns:**

- The selected element or null if not found.

**Example:**

```typescript
import { dom } from "@ahm0xc/utils";

// Returns the element with id 'app'
const app = dom.select("#app");

// Returns the first .item element within a container
const container = dom.select(".container");
const item = dom.select(".item", container);
```

### selectAll(selector: string, parent?: Element|Document): Element[]

Selects all elements matching the selector from the DOM.

**Parameters:**

- `selector` - CSS selector for the elements.
- `parent` - Parent element to search within. Defaults to document.

**Returns:**

- Array of selected elements.

**Example:**

```typescript
import { dom } from "@ahm0xc/utils";

// Returns all .item elements
const items = dom.selectAll(".item");

// Returns all .child elements within a container
const container = dom.select(".container");
const children = dom.selectAll(".child", container);
```

### createElement(tag: string, attributes?: Record<string, any>, children?: (string | Element)[]): HTMLElement

Creates a DOM element with optional attributes and children.

**Parameters:**

- `tag` - HTML tag name.
- `attributes` - Element attributes.
- `children` - Child elements or text.

**Returns:**

- The created element.

**Example:**

```typescript
import { dom } from "@ahm0xc/utils";

// Creates a div with class 'container'
const div = dom.createElement("div", { class: "container" });

// Creates a button with text and click handler
const button = dom.createElement(
  "button",
  {
    class: "btn",
    onclick: () => alert("Clicked!"),
  },
  ["Click me"],
);
```

### addEventListeners(selector: string|Element|Element[], event: string, callback: Function, options?: object): Function

Adds event listeners to multiple elements.

**Parameters:**

- `selector` - CSS selector, element, or element array.
- `event` - Event name to listen for.
- `callback` - Event handler function.
- `options` - Event listener options.

**Returns:**

- Function to remove the event listeners.

**Example:**

```typescript
import { dom } from "@ahm0xc/utils";

// Add click event to all buttons
const removeListeners = dom.addEventListeners("button", "click", (e) => {
  console.log("Button clicked:", e.target);
});

// Later, to remove the listeners
removeListeners();
```

### toggleClass(element: Element, className: string, force?: boolean): boolean

Toggles a class on an element.

**Parameters:**

- `element` - The element to toggle class on.
- `className` - The class to toggle.
- `force` - Force adding or removing the class.

**Returns:**

- True if class is added, false if removed.

**Example:**

```typescript
import { dom } from "@ahm0xc/utils";

// Toggle 'active' class on an element
const button = dom.select("#myButton");
dom.toggleClass(button, "active");

// Force add 'visible' class
dom.toggleClass(element, "visible", true);
```

### dataAttr(element: Element, key: string, value?: string): string|null|void

Gets or sets data attributes on an element.

**Parameters:**

- `element` - The element to work with.
- `key` - The data attribute name without 'data-' prefix.
- `value` - Value to set (if provided).

**Returns:**

- Current value when getting, nothing when setting.

**Example:**

```typescript
import { dom } from "@ahm0xc/utils";

// Get data-id value
const element = dom.select("#myElement");
const id = dom.dataAttr(element, "id");

// Set data-status to 'active'
dom.dataAttr(element, "status", "active");
```

## License

See [LICENSE](./LICENSE) file for details.
