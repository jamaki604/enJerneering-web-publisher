import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DebugPage from "../app/debug/page";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRouter } from "next/navigation";
import React from "react";


vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockImplementation(() => ({
        eq: vi.fn().mockImplementation(() => ({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: new Error("Failed to fetch"),
          }),
        })),
      })),
    })),
  })),
}));

describe("DebugPage Component", () => {
  let routerMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    routerMock = vi.fn();

    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: routerMock,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
  });
 
 it("handles fetchProjectData error", async () => {
    
  
    render(<DebugPage />);
  
    const input = screen.getByPlaceholderText("Enter Project ID");
    fireEvent.change(input, { target: { value: "alsdfa" } });
  
  
    fireEvent.click(screen.getByText("Data Test"));
  
    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch data. Ensure the project ID exists.")
      ).toBeInTheDocument();
    });
  });
  
  it("handles fetchProjectData error and displays the error message", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  
    render(<DebugPage />);
  
    const input = screen.getByPlaceholderText("Enter Project ID");
    fireEvent.change(input, { target: { value: "invalid-id" } });
  
    fireEvent.click(screen.getByText("Data Test"));
  
    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch data. Ensure the project ID exists.")
      ).toBeInTheDocument();
    });
  
    expect(consoleErrorSpy).toHaveBeenCalled();
  
    consoleErrorSpy.mockRestore();
  });
});