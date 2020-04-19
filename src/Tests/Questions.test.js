import React from "react";
import { render } from "@testing-library/react";
import Questions from "../Components/Questions";

test("renders the empty post message without any posts present", () => {
  const { getByText } = render(<Questions empty={true} posts={[]} />);
  const noPosts = getByText(/there are no posts in this forum/i);
  expect(noPosts).toBeInTheDocument();
});

test("renders the list of posts present", () => {
  const { getByText } = render(
    <Questions
      empty={false}
      posts={[
        {
          _id: 0,
          title: "Random post",
          answers: [{ id: 0, text: "Random answer", accepted: true }],
        },
      ]}
    />
  );
  const postTitle = getByText(/random post/i);
  expect(postTitle).toBeInTheDocument();
});
