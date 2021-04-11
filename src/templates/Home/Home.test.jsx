import { render, screen } from "@testing-library/react";
import Home from ".";

describe("Button load more posts", () => {
  test("It should render home with button with text: Ver mais", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: /Ver mais/i });
    expect(button).toBeInTheDocument();
  });
});
