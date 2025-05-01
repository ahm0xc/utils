/**
 * Selects an element from the DOM.
 *
 * @param {string} selector - CSS selector for the element.
 * @param {Element|Document} [parent=document] - Parent element to search within.
 * @returns {Element|null} The selected element or null if not found.
 *
 * @example
 * // Returns the element with id 'app'
 * const app = select('#app');
 *
 * @example
 * // Returns the first .item element within a container
 * const container = select('.container');
 * const item = select('.item', container);
 */
export const select = (
  selector: string,
  parent: Element | Document = document,
): Element | null => parent.querySelector(selector);

/**
 * Selects all elements matching the selector from the DOM.
 *
 * @param {string} selector - CSS selector for the elements.
 * @param {Element|Document} [parent=document] - Parent element to search within.
 * @returns {Element[]} Array of selected elements.
 *
 * @example
 * // Returns all .item elements
 * const items = selectAll('.item');
 *
 * @example
 * // Returns all .child elements within a container
 * const container = select('.container');
 * const children = selectAll('.child', container);
 */
export const selectAll = (
  selector: string,
  parent: Element | Document = document,
): Element[] => Array.from(parent.querySelectorAll(selector));

/**
 * Creates a DOM element with optional attributes and children.
 *
 * @param {string} tag - HTML tag name.
 * @param {object} [attributes={}] - Element attributes.
 * @param {(string|Element)[]} [children=[]] - Child elements or text.
 * @returns {HTMLElement} The created element.
 *
 * @example
 * // Creates a div with class 'container'
 * const div = createElement('div', { class: 'container' });
 *
 * @example
 * // Creates a button with text and click handler
 * const button = createElement('button', {
 *   class: 'btn',
 *   onclick: () => alert('Clicked!')
 * }, ['Click me']);
 */
export const createElement = (
  tag: string,
  attributes: Record<string, any> = {},
  children: (string | Element)[] = [],
): HTMLElement => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
};

/**
 * Adds event listeners to multiple elements.
 *
 * @param {string|Element|Element[]} selector - CSS selector, element, or element array.
 * @param {string} event - Event name to listen for.
 * @param {Function} callback - Event handler function.
 * @param {object} [options] - Event listener options.
 * @returns {Function} Function to remove the event listeners.
 *
 * @example
 * // Add click event to all buttons
 * const removeListeners = addEventListeners('button', 'click', (e) => {
 *   console.log('Button clicked:', e.target);
 * });
 *
 * // Later, to remove the listeners
 * removeListeners();
 */
export const addEventListeners = (
  selector: string | Element | Element[],
  event: string,
  callback: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions,
): (() => void) => {
  let elements: Element[];

  if (typeof selector === "string") {
    elements = Array.from(document.querySelectorAll(selector));
  } else if (Array.isArray(selector)) {
    elements = selector;
  } else {
    elements = [selector];
  }

  elements.forEach((el) => el.addEventListener(event, callback, options));

  return () => {
    elements.forEach((el) => el.removeEventListener(event, callback, options));
  };
};

/**
 * Toggles a class on an element.
 *
 * @param {Element} element - The element to toggle class on.
 * @param {string} className - The class to toggle.
 * @param {boolean} [force] - Force adding or removing the class.
 * @returns {boolean} True if class is added, false if removed.
 *
 * @example
 * // Toggle 'active' class on an element
 * const button = select('#myButton');
 * toggleClass(button, 'active');
 *
 * @example
 * // Force add 'visible' class
 * toggleClass(element, 'visible', true);
 */
export const toggleClass = (
  element: Element,
  className: string,
  force?: boolean,
): boolean => element.classList.toggle(className, force);

/**
 * Gets or sets data attributes on an element.
 *
 * @param {Element} element - The element to work with.
 * @param {string} key - The data attribute name without 'data-' prefix.
 * @param {string} [value] - Value to set (if provided).
 * @returns {string|null|void} Current value when getting, nothing when setting.
 *
 * @example
 * // Get data-id value
 * const id = dataAttr(element, 'id');
 *
 * @example
 * // Set data-status to 'active'
 * dataAttr(element, 'status', 'active');
 */
export const dataAttr = (
  element: Element,
  key: string,
  value?: string,
): string | null | void => {
  if (value === undefined) {
    return element.getAttribute(`data-${key}`);
  }
  element.setAttribute(`data-${key}`, value);
};
