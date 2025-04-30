import { test, expect } from "vitest";

import { delay } from "./utils.js";

test("delay", async () => {
  const start = Date.now();
  await delay(10);
  const end = Date.now();
  expect(end - start).toBeGreaterThanOrEqual(10);
});
