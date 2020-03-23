import React from "react";
import { render } from "@testing-library/react";
import Questions from "./Questions";

test("renders the empty post message without any posts present", () => {
  const { getByText } = render(<Questions empty={true} posts={[]} />);
  const noPosts = getByText(/there are no posts in this forum/i);
  expect(noPosts).toBeInTheDocument();
});

test("renders the list of posts present", () => {
  const { getByText } = render(
    <Questions empty={false} posts={[{ id: 0, title: "Random post" }]} />
  );
  const postTitle = getByText(/random post/i);
  expect(postTitle).toBeInTheDocument();
});