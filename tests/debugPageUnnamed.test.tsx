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
  
  it("handles missing project title by storing as 'Unnamed Project'", async () => {

    render(<DebugPage />);
    
    // Simulate entering an invalid project ID and triggering data fetch
    const input = screen.getByPlaceholderText("Enter Project ID");
    fireEvent.change(input, { target: { value: "invalid-id" } });

    await act(async () => {
      fireEvent.click(screen.getByText("Data Test"));
    });

    // Verify "Unnamed Project" is stored and displayed
    await waitFor(() => {
      expect(screen.getByText("Unnamed Project")).toBeInTheDocument();
    });

    // Check that localStorage contains the unnamed project
    const storedProjects = JSON.parse(localStorage.getItem("recentProjects") || "[]");
    expect(storedProjects).toEqual([{ projectId: "invalid-id", projectTitle: "Unnamed Project" }]);
  });


});