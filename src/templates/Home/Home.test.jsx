/* eslint-disable no-undef */
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, waitFor } from "@testing-library/react";
import Home from ".";
import userEvent from "@testing-library/user-event";

const handles = [
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, cxt) => {
    return res(
      cxt.json([
        {
          userId: 1,
          id: 1,
          title: "test 1",
          body: "body test 1",
        },
        {
          userId: 2,
          id: 2,
          title: "test 2",
          body: "body test 2",
        },
        {
          userId: 3,
          id: 3,
          title: "test 3",
          body: "body test 3",
        },
      ])
    );
  }),
  rest.get("https://jsonplaceholder.typicode.com/photos", (req, res, cxt) => {
    return res(
      cxt.json([
        {
          albumId: 1,
          id: 1,
          title: "img 1",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
        {
          albumId: 2,
          id: 2,
          title: "img 2",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
        {
          albumId: 3,
          id: 3,
          title: "img 3",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952",
        },
      ])
    );
  }),
];

const server = setupServer(...handles);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test("It should render home with button with text: Ver mais and Posts", async () => {
    render(<Home />);

    expect.assertions(2);

    const button = screen.getByRole("button", { name: /Ver mais/i });
    expect(button).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole("heading", { name: /test/i })).toHaveLength(3);
    });
  });

  test("It should filter search", async () => {
    render(<Home />);

    expect.assertions(5);

    const search = screen.getByPlaceholderText("Search");

    await waitFor(() => {
      expect(screen.getAllByRole("heading", { name: /test/i })).toHaveLength(3);
    });

    userEvent.type(search, "test 1");
    expect(screen.getAllByRole("heading", { name: /test/i })).toHaveLength(1);
    expect(screen.queryByRole("heading", { name: /test 1/i }))
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 2/i })).not
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 3/i })).not
      .toBeInTheDocument;

    userEvent.clear(search);
    expect(screen.getAllByRole("heading", { name: /test/i })).toHaveLength(3);
    expect(screen.queryByRole("heading", { name: /test 1/i }))
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 2/i }))
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 3/i }))
      .toBeInTheDocument;

    userEvent.type(search, "test");
    expect(screen.getAllByRole("heading", { name: /test/i })).toHaveLength(3);
    expect(screen.queryByRole("heading", { name: /test 1/i }))
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 2/i }))
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 3/i }))
      .toBeInTheDocument;

    userEvent.type(search, "test 1231");
    expect(screen.queryAllByRole("heading", { name: /test/i })).toHaveLength(0);
    expect(screen.queryByRole("heading", { name: /test 1/i })).not
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 2/i })).not
      .toBeInTheDocument;
    expect(screen.queryByRole("heading", { name: /test 3/i })).not
      .toBeInTheDocument;
  });
});
