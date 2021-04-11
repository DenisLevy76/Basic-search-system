import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const mockPosts = [
  {
    id: 1,
    title: "Hello, world!",
    body: "Todos os tipos de hello, world",
    img: "https://github.com/DenisLevy76.png",
  },
  {
    id: 2,
    title: "Hello, world! 2",
    body: "Todos os tipos de hello, world 2",
    img: "https://github.com/DenisLevy76.png",
  },
];

describe("<Posts />", () => {
  test("should render Posts component", () => {
    render(<Posts posts={mockPosts} />);
  });
  test("should render 2 posts", () => {
    render(<Posts posts={mockPosts} />);

    const posts = screen.getAllByRole("heading", { name: /Hello/i });
    expect(posts.length).toBe(2);
  });
  test("should not render posts", () => {
    render(<Posts posts={[]} />);

    const posts = screen.queryByRole("heading", { name: /Hello/i });
    expect(posts).not.toBeInTheDocument();
  });
});
