import { test, expect } from "vitest";

import { delay, capitalize, isEmpty, randomInt, chunkArray } from "./utils.js";

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

test("isEmpty", () => {
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty(undefined)).toBe(true);
  expect(isEmpty("")).toBe(true);
});

test("randomInt", () => {
  const min = 1;
  const max = 10;
  const result = randomInt(min, max);
  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
});

test("chunkArray", () => {
  const array = [1, 2, 3, 4, 5];
  const size = 2;
  const result = chunkArray(array, size);
  expect(result).toEqual([[1, 2], [3, 4], [5]]);
});
