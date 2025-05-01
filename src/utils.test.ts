import { test, expect } from "vitest";

import { delay, capitalize } from "./utils.js";

test("delay", async () => {
  const start = Date.now();
  await delay(10);
  const end = Date.now();
  expect(end - start).toBeGreaterThanOrEqual(10);
});

test("capitalize", () => {
  expect(capitalize("hello")).toBe("Hello");
  expect(capitalize("world")).toBe("World");
});
