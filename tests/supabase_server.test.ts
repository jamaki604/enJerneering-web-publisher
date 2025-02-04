// Verifies that the `createClient` function correctly initializes a Supabase client using the provided environment variables.


import { vi, describe, it, expect } from "vitest";
import { createClient } from "../supabase/server";
import { createServerClient } from "@supabase/ssr";

// The `createServerClient` function from `@supabase/ssr` is mocked to track how it's called.
vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    getAll: vi.fn(() => []),
    set: vi.fn(),
  })),
}));


// - The test ensures that when `createClient` is called, it correctly:
//   - Uses the environment variables `SUPABASE_URL` and `SUPABASE_KEY`.
//   - Calls `createServerClient` with the expected parameters, including a properly structured cookies object with `getAll` and `setAll` methods.

describe("createClient", () => {
  it("should create a Supabase client with correct parameters", async () => {
    process.env.SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_KEY = "test-key";

    await createClient();

    expect(createServerClient).toHaveBeenCalledWith(
      "https://test.supabase.co",
      "test-key",
      expect.objectContaining({
        cookies: expect.objectContaining({
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        }),
      })
    );
  });
});
