// Verifies the correctness of the `menuStyles` function,
// ensuring it generates the expected Tailwind CSS class names for different parts of the menu component.

import { describe, it, expect } from "vitest";
import { menuStyles } from "../components/menu/Menu";

// Checks that the `root` function generates the correct base styles for the menu.
describe("Menu Styles", () => {
  it("should generate correct root class names", () => {
    const { root } = menuStyles();
    expect(root()).toBe("py-1 bg-white rounded-md mt-2 shadow-menu");
  });

  // Ensures that the `action` function applies the expected button styles, including spacing, font size, and hover effects.
  it("should generate correct action class names", () => {
    const { action } = menuStyles();
    expect(action()).toContain("px-4 py-3.5 font-medium text-sm border-b border-border-100");
    expect(action()).toContain("hover:bg-background-100 transition-colors");
  });

// Verifies that the `label` function applies the correct margin style when it's not the first child.
  it("should generate correct label class names", () => {
    const { label } = menuStyles();
    expect(label()).toBe("[&:not(:first-child)]:ml-2");
  });
});
