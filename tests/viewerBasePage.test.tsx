import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import ViewerBasePage from "../app/viewer/page";
import { redirect } from "next/navigation";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("ViewerBasePage Component", () => {
  it("redirects users to the home page", () => {
    render(<ViewerBasePage />);
    
    expect(redirect).toHaveBeenCalledWith("/");
  });
});
