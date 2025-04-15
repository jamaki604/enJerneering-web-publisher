import { describe, it, expect, vi } from "vitest";
import { redirect } from "next/navigation";
import { render, screen, waitFor } from "@testing-library/react";
import ProjectRedirectPage from "../app/page";

// ✅ Mock redirect to track calls
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// ✅ Mock Supabase client
vi.mock("@internalSupabase/client", () => ({
  createClient: () => ({
    from: (table: string) => ({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: table === "pages" 
            ? [{ pageTitle: "test-page" }] // Mock valid page
            : [{ designId: "123" }], // Mock valid design
          error: null,
        }),
      }),
    }),
  }),
}));

describe("ProjectRedirectPage - Redirect Tests", () => {


  it("shows 'First page not found.' when firstPageTitle is missing", async () => {
    vi.mock("@internalSupabase/client", () => ({
      createClient: () => ({
        from: (table: string) => ({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: table === "pages" ? [{}] : [{ designId: "123" }], // Empty page object
              error: null,
            }),
          }),
        }),
      }),
    }));

    render(await ProjectRedirectPage({ params: { projectId: "test-id" } }));

    await waitFor(() => {
      expect(screen.getByText("First page not found.")).toBeInTheDocument();
    });
  });
});
