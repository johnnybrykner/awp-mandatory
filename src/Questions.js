import React from "react";
import Question from "./Question";
import { Link } from "@reach/router";

export default class Questions extends React.Component {
  whatToRender() {
    if (this.props.empty)
      return (
        <h2>There are no posts in this forum just yet, why not add some?</h2>
      );
    if (!this.props.empty && this.props.posts.length) {
      const posts = this.props.posts.map((post) => {
        return (
          <Question
            editPost={(editedPost) => this.props.editPost(editedPost)}
            question={post}
            key={post.id}
          ></Question>
        );
      });
      return (
        <ul>
          <h2>Here are some very interesting posts:</h2>
          {posts}
        </ul>
      );
    }
  }

  render() {
    return (
      <>
        {this.whatToRender()}
        <Link to="/ask" className="questions__ask_button">
          Ask a question!
        </Link>
      </>
    );
  }
}
