import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BlogData } from "@components/blog/types/BlogData";
import Blog from "@components/blog";

const mockAuthor = {
    name: "John Doe",
    avatarUrl: "https://example.com/avatar.jpg", // ✅ Fixed this property
    href: "https://example.com/johndoe",
  };
  
  const mockBlogData: BlogData = {
    title: "Tech Insights",
    subtitle: "Latest trends in technology",
    isShowAuthor: true,
    blogList: [
      {
        title: "AI in 2025",
        subtitle: "How AI is shaping the future",
        category: "Technology",
        thumbnailUrl: "https://example.com/ai-thumbnail.jpg",
        publishedAt: "2025-03-17",
        timeRead: "5 min",
        author: mockAuthor, // ✅ Uses the corrected author object
        href: "https://example.com/ai-2025",
        type: 1,
      },
    ],
  };
  
  describe("Blog Component", () => {
    it("renders blog title and subtitle", () => {
      render(<Blog type={1} data={mockBlogData} />);
      expect(screen.getByText("Tech Insights")).toBeInTheDocument();
      expect(screen.getByText("Latest trends in technology")).toBeInTheDocument();
    });
  
    it("renders blog items", () => {
      render(<Blog type={1} data={mockBlogData} />);
      expect(screen.getByText("AI in 2025")).toBeInTheDocument();
      expect(screen.getByText("How AI is shaping the future")).toBeInTheDocument();
    });
  
    it("shows author information if enabled", () => {
      render(<Blog type={1} data={mockBlogData} />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  
    it("throws an error for unsupported types", () => {
      expect(() => render(<Blog type={99} data={mockBlogData} />)).toThrowError(
        "Blog type 99 is not supported"
      );
    });
  });