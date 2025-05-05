import { test, expect } from "vitest";

import {
  delay,
  capitalize,
  isEmpty,
  randomInt,
  chunkArray,
  uniqueArray,
  sumArray,
  shuffleArray,
  tryCatch,
  getFavicon,
  isUrl,
} from "./utils.js";

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

test("uniqueArray", () => {
  const array = [1, 2, 2, 3, 1];
  const result = uniqueArray(array);
  expect(result).toEqual([1, 2, 3]);
});

test("sumArray", () => {
  const array = [1, 2, 3];
  const result = sumArray(array);
  expect(result).toEqual(6);
});

test("shuffleArray", () => {
  const array = [1, 2, 3, 4, 5];
  const result = shuffleArray(array);
  // Verify result is not the same object reference
  expect(result).not.toBe(array);
  // Verify result contains the same elements
  expect(result.sort()).toEqual([...array].sort());
  // Run multiple times to ensure different order with high probability
  let atLeastOneDifferentOrder = false;
  for (let i = 0; i < 10; i++) {
    const shuffled = shuffleArray(array);
    if (JSON.stringify(shuffled) !== JSON.stringify(array)) {
      atLeastOneDifferentOrder = true;
      break;
    }
  }
  expect(atLeastOneDifferentOrder).toBe(true);
});

test("tryCatch", async () => {
  const [firstData, firstError] = await tryCatch(Promise.resolve("success"));
  expect(firstData).toBe("success");
  expect(firstError).toBeNull();

  const [_, secondError] = await tryCatch(Promise.reject(new Error("error")));
  expect(secondError).toBeInstanceOf(Error);
  expect(secondError?.message).toBe("error");
});

test("getFavicon", () => {
  const favicon = getFavicon("https://example.com/some-route");
  expect(favicon).toBe(
    "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://example.com&size=32",
  );
  const favicon2 = getFavicon("some random string");
  expect(favicon2).toBe("");
  const favicon3 = getFavicon("https://www.example.com/some-route/");
  expect(favicon3).toBe(
    "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.example.com&size=32",
  );
});

test("isUrl", () => {
  expect(isUrl("https://example.com")).toBe(true);
  expect(isUrl("not a url")).toBe(false);
  expect(isUrl("http://example.com/some-route")).toBe(true);
  expect(isUrl("ftp://example.com")).toBe(true);
  expect(isUrl("mailto:test@example.com")).toBe(true);
  expect(isUrl("tel:1234567890")).toBe(true);
});
