import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DebugPage from "../app/page";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRouter } from "next/navigation";
import React from "react";
import { act } from "react-dom/test-utils";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockImplementation(() => ({
        eq: vi.fn().mockImplementation(() => ({
          single: vi.fn().mockResolvedValue({
            data: { projectTitle: "Test Project" },
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

  it("renders DebugPage correctly", () => {
    render(<DebugPage />);
    expect(screen.getByText("enJerneering UI Viewer")).toBeInTheDocument();
    expect(screen.getByText("Debug Panel")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Project ID")).toBeInTheDocument();
  });

  it("updates the projectId input field when typing", () => {
    render(<DebugPage />);
    const input = screen.getByPlaceholderText("Enter Project ID") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "123456" } });
    expect(input.value).toBe("123456");
  });

  it("shows an error message when trying to navigate without a projectId", async () => {
    render(<DebugPage />);
    await act(async () => {
      fireEvent.click(screen.getByText("Go to Viewer"));
    });

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid Project ID.")).toBeInTheDocument();
    });
  });

  it("navigates to the viewer page when a valid projectId is provided", async () => {
    render(<DebugPage />);
    const input = screen.getByPlaceholderText("Enter Project ID");

    fireEvent.change(input, { target: { value: "test-project-id" } });

    await act(async () => {
      fireEvent.click(screen.getByText("Go to Viewer"));
    });

    await waitFor(() => {
      expect(routerMock).toHaveBeenCalledWith("/viewer/test-project-id");
    });
  });

  it("fetches project data and displays it", async () => {
    render(<DebugPage />);
    const input = screen.getByPlaceholderText("Enter Project ID");

    fireEvent.change(input, { target: { value: "valid-id" } });

    await act(async () => {
      fireEvent.click(screen.getByText("Data Test"));
    });

    await waitFor(() => {
      const matches = screen.getAllByText((content) => content.includes("Test Project"));
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it("stores and displays recently tested projects from local storage", () => {
    localStorage.setItem(
      "recentProjects",
      JSON.stringify([{ projectId: "123", projectTitle: "Saved Project" }])
    );

    render(<DebugPage />);
    expect(screen.getByText("Saved Project")).toBeInTheDocument();
  });
});