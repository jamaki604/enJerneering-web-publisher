import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DebugPage from "../app/debug/page";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRouter } from "next/navigation";
import React from "react";
import { act } from "react-dom/test-utils";
import { mockSupabaseClient } from "./mockSupabaseClient";

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
            error: null,
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

  it("shows an error when trying to fetch project data without a projectId", async () => {
    render(<DebugPage />);
  
    // Click "Data Test" without entering a Project ID
    await act(async () => {
      fireEvent.click(screen.getByText("Data Test"));
    });
  
    // Verify the error message appears
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid Project ID.")).toBeInTheDocument();
    });
  });

it("shows an error when trying to navigate without a projectId", async () => {
  render(<DebugPage />);
  
  // Click "Go to Viewer" without entering a Project ID
  await act(async () => {
    fireEvent.click(screen.getByText("Go to Viewer"));
  });

  // Verify the error message appears
  await waitFor(() => {
    expect(screen.getByText("Please enter a valid Project ID.")).toBeInTheDocument();
  });
});

});