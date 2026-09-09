import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import { BLOG_POSTS } from "@/data/blogPosts";

describe("Blog section", () => {
  it("renders the blog index page with articles and categories", () => {
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <Routes>
          <Route path="/blog" element={<BlogIndex />} />
        </Routes>
      </MemoryRouter>
    );

    // Title should be visible
    expect(
      screen.getByRole("heading", { name: /Privacy, Offline Mesh & Modern Communication/i })
    ).toBeInTheDocument();

    // All categories should be rendered
    expect(screen.getByRole("button", { name: /All Articles/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Privacy & Security/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Guides & Tutorials/i })).toBeInTheDocument();

    // Featured post should be present
    expect(
      screen.getByText(/How to Text Without Cell Service or Wi-Fi/i)
    ).toBeInTheDocument();
  });

  it("renders an individual blog post with TOC, author, and content", () => {
    const post = BLOG_POSTS[0];

    render(
      <MemoryRouter initialEntries={[`/blog/${post.slug}`]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    );

    // Post title
    expect(screen.getByRole("heading", { name: post.title })).toBeInTheDocument();

    // Author name
    expect(screen.getAllByText(post.author.name).length).toBeGreaterThan(0);

    // Key takeaway
    expect(screen.getByText("Key Takeaway")).toBeInTheDocument();

    // First section heading
    expect(
      screen.getByRole("heading", { name: post.sections[0].heading })
    ).toBeInTheDocument();
  });
});
