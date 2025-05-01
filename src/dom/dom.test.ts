import { test, expect, vi, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import {
  select,
  selectAll,
  createElement,
  addEventListeners,
  toggleClass,
  dataAttr,
} from "./dom.js";

// Create a JSDOM instance for testing
let dom: JSDOM;
let document: Document;
let window: any;

// Set up the DOM before each test
beforeEach(() => {
  dom = new JSDOM(`
    <html>
      <body>
        <div id="app">
          <div class="container">
            <button class="btn">Button 1</button>
            <button class="btn">Button 2</button>
          </div>
          <div class="item" data-id="1">Item 1</div>
          <div class="item" data-id="2">Item 2</div>
        </div>
      </body>
    </html>
  `);
  window = dom.window;
  document = window.document;

  // Mock the global document and window
  global.document = document;
  global.window = window;
  (global as any).Element = window.Element;
});

test("select", () => {
  const app = select("#app");
  expect(app).not.toBeNull();
  expect(app?.id).toBe("app");

  const container = select(".container", app!);
  expect(container).not.toBeNull();
  expect(container?.className).toBe("container");

  const nonExistent = select("#non-existent");
  expect(nonExistent).toBeNull();
});

test("selectAll", () => {
  const buttons = selectAll(".btn");
  expect(buttons.length).toBe(2);

  const items = selectAll(".item");
  expect(items.length).toBe(2);

  const container = select(".container");
  const buttonsInContainer = selectAll(".btn", container!);
  expect(buttonsInContainer.length).toBe(2);

  const nonExistent = selectAll(".non-existent");
  expect(nonExistent.length).toBe(0);
});

test("createElement", () => {
  const div = createElement("div", { class: "test", id: "test-div" }, ["Test"]);
  expect(div.tagName).toBe("DIV");
  expect(div.className).toBe("test");
  expect(div.id).toBe("test-div");
  expect(div.textContent).toBe("Test");

  // Test with event listener
  const clickHandler = vi.fn();
  const button = createElement("button", { onclick: clickHandler }, ["Click"]);
  expect(button.tagName).toBe("BUTTON");
  expect(button.textContent).toBe("Click");

  // Simulate click
  button.click();
  expect(clickHandler).toHaveBeenCalledTimes(1);

  // Test with child elements
  const childDiv = createElement("div", { class: "child" }, ["Child"]);
  const parent = createElement("div", { class: "parent" }, [childDiv]);
  expect(parent.children.length).toBe(1);
  expect(parent.firstElementChild).toBe(childDiv);
});

test("addEventListeners", () => {
  const clickHandler = vi.fn();
  const buttons = selectAll(".btn");

  const removeListeners = addEventListeners(buttons, "click", clickHandler);

  // Simulate clicks
  buttons.forEach((btn) => (btn as HTMLElement).click());
  expect(clickHandler).toHaveBeenCalledTimes(2);

  // Remove listeners and test again
  removeListeners();
  buttons.forEach((btn) => (btn as HTMLElement).click());
  expect(clickHandler).toHaveBeenCalledTimes(2); // Should still be 2

  // Test with selector string
  const newHandler = vi.fn();
  const removeNewListeners = addEventListeners(".btn", "click", newHandler);

  buttons.forEach((btn) => (btn as HTMLElement).click());
  expect(newHandler).toHaveBeenCalledTimes(2);

  removeNewListeners();
});

test("toggleClass", () => {
  const div = createElement("div", { class: "test" }, []);

  // Toggle class (add)
  const result1 = toggleClass(div, "active");
  expect(result1).toBe(true);
  expect(div.classList.contains("active")).toBe(true);

  // Toggle class (remove)
  const result2 = toggleClass(div, "active");
  expect(result2).toBe(false);
  expect(div.classList.contains("active")).toBe(false);

  // Force add
  const result3 = toggleClass(div, "visible", true);
  expect(result3).toBe(true);
  expect(div.classList.contains("visible")).toBe(true);

  // Force add again (should still return true)
  const result4 = toggleClass(div, "visible", true);
  expect(result4).toBe(true);
  expect(div.classList.contains("visible")).toBe(true);
});

test("dataAttr", () => {
  const items = selectAll(".item");
  const item1 = items[0]!;
  const item2 = items[1]!;

  // Get existing data attribute
  expect(dataAttr(item1, "id")).toBe("1");
  expect(dataAttr(item2, "id")).toBe("2");

  // Set data attribute
  dataAttr(item1, "status", "active");
  expect(item1.getAttribute("data-status")).toBe("active");

  // Get newly set data attribute
  expect(dataAttr(item1, "status")).toBe("active");

  // Get non-existent data attribute
  expect(dataAttr(item2, "status")).toBeNull();
});
