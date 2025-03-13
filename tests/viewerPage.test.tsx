import { render, screen, waitFor } from "@testing-library/react";
import ViewerPage from "../app/viewer/page";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useSearchParams } from "next/navigation";
import { mockSupabaseClient } from "./mockSupabaseClient";
import React from "react";

vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test-supabase-url.supabase.co');
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test_anon_key');

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(() => ({
    get: vi.fn(() => "test-project-id"),
  })),
}));

vi.mock("../supabase/client", () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

describe("ViewerPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockSupabaseClient.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: {
          navigationData: [],
          layerData: {},
          headerData: {},
          footerData: JSON.stringify({ text: "Footer Content" }),
        },
        error: null,
      }),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    });
  });

  it("renders loading state initially", () => {
    render(<ViewerPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("extracts projectId from URL and logs it", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<ViewerPage />);
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Extracted projectId from URL:", "test-project-id");
    });
  });

  it("fetches project data and renders sections", async () => {
    render(<ViewerPage />);

    await waitFor(() => {
      expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });
  });

  it("handles missing projectId gracefully", async () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: () => null,
    } as any);

    const consoleWarnSpy = vi.spyOn(console, "warn");
    render(<ViewerPage />);

    await waitFor(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith("No projectId found in URL.");
    });
  });

  it("handles API errors properly", async () => {
    mockSupabaseClient.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "Invalid request" },
      }),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    });

    const consoleErrorSpy = vi.spyOn(console, "error");
    render(<ViewerPage />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching data:",
        expect.objectContaining({
          message: "WebElements error: Invalid request",
        }),
      );
    });
  });
});