import React from "react";
import { Router } from "@reach/router";
import Questions from "./Questions";
import AskQuestion from "./AskQuestion";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      empty: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch(method, body, id) {
    const baseUrl =
      id !== undefined
        ? `http://localhost:8080/posts/${id}`
        : "http://localhost:8080/posts";
    let raw = [];
    if (!method && !body) {
      raw = await fetch(baseUrl);
    }
    if (method && body) {
      raw = await fetch(baseUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method.toUpperCase(),
        body: JSON.stringify(body),
      });
    }

    const posts = await raw.json();

    if (posts) {
      this.setState((_) => ({
        posts,
        empty: false,
      }));
      return;
    }
    this.setState((_) => ({
      empty: true,
    }));
  }

  addPost(newPost) {
    this.fetch("post", newPost);
  }

  editPost(editedPost) {
    this.fetch("put", editedPost, editedPost.id);
  }

  render() {
    return (
      <>
        <h1>Welcome to Otack Sverflow</h1>
        <Router>
          <Questions
            path="/"
            editPost={(editedPost) => this.editPost(editedPost)}
            empty={this.state.empty}
            posts={this.state.posts}
          ></Questions>
          <AskQuestion
            path="/ask"
            addPost={(post) => this.addPost(post)}
          ></AskQuestion>
        </Router>
      </>
    );
  }
}
