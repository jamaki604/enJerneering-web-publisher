import { describe, it, expect, vi } from "vitest";
import { mockSupabaseClient } from "./mockSupabaseClient";
import { createClient } from "@supabase/supabase-js";


describe("Basic Test Suite", () => {
  it("should pass a simple test", () => {
    expect(1 + 1).toBe(2);
  });
});


vi.mock("@supabase/supabase-js");

describe("Supabase Authentication", () => {
  it("should call signInWithPassword", async () => {
    // Mock successful response
    mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });

    const supabase = createClient("url", "anon-key");
    const response = await supabase.auth.signInWithPassword({
      email: "test@example.com",
      password: "password123",
    });

    // ✅ Type Guard: Ensure response.data exists before accessing `user`
    expect(response.data).not.toBeNull();
    expect(response.data?.user?.id).toBe("123");

    expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledTimes(1);
  });

  it("should handle signInWithPassword returning null data", async () => {
    // Mock failure case where `data` is null
    mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid credentials" },
    });

    const supabase = createClient("url", "anon-key");
    const response = await supabase.auth.signInWithPassword({
      email: "wrong@example.com",
      password: "wrongpassword",
    });

    // ✅ Handle case where `data` is null
    expect(response.data).toBeNull();
    expect(response.error?.message).toBe("Invalid credentials");
  });
});
