import { render, screen } from "@testing-library/react";
import { Post } from ".";

const mockPost = {
  id: 1,
  title: "Hello, world!",
  body: "Todos os tipos de hello, world",
  img: "https://github.com/DenisLevy76.png",
};

describe("<Post />", () => {
  test("It should render a post", () => {
    render(<Post post={mockPost} />);

    //um preview de como o html fica dps de renderizar
    // const {debug} = render(<Post post={mockPost}/>)

    // debug();
  });

  test("It should contais a img", () => {
    render(<Post post={mockPost} />);

    const img = screen.getByAltText(mockPost.title);

    expect(img).toHaveAttribute("src", mockPost.img);
  });

  test("It should contais a h2 with post title", () => {
    render(<Post post={mockPost} />);

    const h2 = screen.getByRole("heading", {
      name: mockPost.title + " " + mockPost.id,
    });

    expect(h2).toBeInTheDocument();
  });

  test("It should contais a p with post body", () => {
    render(<Post post={mockPost} />);

    const p = screen.getByText(mockPost.body);

    expect(p).toBeInTheDocument();
  });

  test("It should match snapshot", () => {
    const { container } = render(<Post post={mockPost} />);
    expect(container).toMatchSnapshot();
  });
});
