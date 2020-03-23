import React from "react";
import { v4 as uuidv4 } from "uuid";
import { navigate } from "@reach/router";

export default class AskQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      question: "",
      error: "",
    };

    this.titleChange = this.titleChange.bind(this);
    this.questionChange = this.questionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  titleChange({ target }) {
    this.setState((_) => ({
      title: target.value,
      error: "",
    }));
  }

  questionChange({ target }) {
    this.setState((_) => ({
      question: target.value,
      error: "",
    }));
  }

  submitForm(event) {
    event.preventDefault();
    if (this.state.title !== "" && this.state.question !== "") {
      this.props.addPost({
        id: uuidv4(),
        title: this.state.title,
        question: this.state.question,
        upvotes: 0,
        downvotes: 0,
      });
      navigate("/");
    }
    if (this.state.title === "") {
      this.setState((_) => ({
        error: "Your post seems to be missing a title, please provide one.",
      }));
    }
    if (this.state.question === "") {
      this.setState((_) => ({
        error:
          "Your post seems to be empty, you surely meant to ask something!",
      }));
    }
  }

  render() {
    return (
      <>
        <form className="ask__container">
          <div className="ask__form">
            <input
              name="title"
              value={this.state.title}
              placeholder="Title of your question"
              onChange={this.titleChange}
            ></input>
            <input
              name="question"
              value={this.state.question}
              placeholder="Your question"
              onChange={this.questionChange}
            ></input>
            <input type="submit" onClick={this.submitForm}></input>
          </div>
          <span className="ask__error">{this.state.error}</span>
        </form>
      </>
    );
  }
}
