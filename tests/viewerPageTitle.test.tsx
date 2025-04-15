import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { mockSupabaseClient } from "./mockSupabaseClient";
import { useParams } from "next/navigation";
import PageViewer from "../app/[pageTitle]/page";
import dukeNukemData from "./jsonTestFiles/dukeNukem.json"; 

// Mock environment variables
vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test-supabase-url.supabase.co");
vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test_anon_key");

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useParams: vi.fn(() => ({
    projectId: "195c502b-81ca-4f56-8442-aa9659f4baef",
    pageTitle: "Landing-Page",
  })),
}));

// Mock Supabase client
vi.mock("../supabase/client", () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}));

describe("ViewerPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mocks for Supabase queries using dukeNukem.json data
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

      switch (table) {
        case "web-elements":
          mockReturnValue.select = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: dukeNukemData.footerData,
                error: null,
              }),
            }),
          });
          break;
        case "designs":
          mockReturnValue.select = vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: dukeNukemData.designData,
              error: null,
            }),
          });
          break;
        case "pages":
          mockReturnValue.select = vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: dukeNukemData.pagesData,
              error: null,
            }),
          });
          break;
        case "layers":
          mockReturnValue.select = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: dukeNukemData.layerData,
                error: null,
              }),
            }),
          });
          break;
        default:
          mockReturnValue.select = vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: null, error: null }),
          });
          break;
      }

      return mockReturnValue;
    });
  });

  it("extracts projectId from URL and logs it", async () => {
    const consoleLogSpy = vi.spyOn(console, "log");
    render(<PageViewer />);
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Checking projectId:",
        "195c502b-81ca-4f56-8442-aa9659f4baef"
      );
    });
  });

  it("handles missing projectId gracefully", () => {
    vi.mocked(useParams).mockReturnValue({ projectId: "", pageTitle: "" });
    const consoleWarnSpy = vi.spyOn(console, "warn");
    render(<PageViewer />);
    expect(consoleWarnSpy).toHaveBeenCalledWith("No projectId found in URL.");
  });

  

});