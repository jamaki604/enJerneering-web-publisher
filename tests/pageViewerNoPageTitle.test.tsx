import React from "react";
import { render, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useParams } from "next/navigation";
import { mockSupabaseClient } from "./mockSupabaseClient";
import PageViewer from "../app/[pageTitle]/page";

// Mock Supabase client
vi.mock("../supabase/client", () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useParams: vi.fn(() => ({
    projectId: "test-project-id",
    pageTitle: "", // Simulating missing or empty page title
  })),
}));

describe("PageViewer Component - No Page Title", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws an error when no page is found for the given title", async () => {
    // Corrected Mock Supabase Responses
    mockSupabaseClient.from.mockImplementation((table: string) => {
      const mockReturnValue = {
        select: vi.fn(),
        insert: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        eq: vi.fn(),
        single: vi.fn(),
        order: vi.fn(),
      };

      mockReturnValue.select.mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: table === "designs" ? [{ designId: "design-123" }] : null,
            error: null,
          }),
        }),
      });

      return mockReturnValue;
    });

    // Spy on console.error to capture thrown errors
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<PageViewer />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching data:",
        expect.objectContaining({
          message: "No page found for title: ",
        })
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
