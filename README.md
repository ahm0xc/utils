# @ahm0xc/utils

A collection of utility functions for JavaScript and TypeScript projects.

## Installation

```bash
npm install @ahm0xc/utils
```

## Table of Contents

- [API Reference](#api-reference)
  - [delay](#delayms-number-promisevoid)
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

## License

See [LICENSE](./LICENSE) file for details.
