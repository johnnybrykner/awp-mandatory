import React from "react";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      answering: false,
      answerText: "",
      error: "",
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.toggleAnswer = this.toggleAnswer.bind(this);
    this.answerChange = this.answerChange.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  upvote() {
    this.setState(
      {
        question: {
          ...this.state.question,
          upvotes: this.state.question.upvotes + 1,
        },
      },
      () => this.props.editPost(this.state.question)
    );
  }

  downvote() {
    this.setState(
      {
        question: {
          ...this.state.question,
          downvotes: this.state.question.downvotes - 1,
        },
      },
      () => this.props.editPost(this.state.question)
    );
  }

  acceptAnswer(answerId) {
    console.log(answerId);
  }

  answerChange({ target }) {
    this.setState((_) => ({
      answerText: target.value,
      error: "",
    }));
  }

  toggleAnswer() {
    this.setState(
      {
        answering: !this.state.answering,
        error: "",
      },
      (_) => {
        if (this.state.answering) {
          document.querySelector(".answer__container").classList.add("shown");
          document.querySelector(
            ".post__answer_button"
          ).innerHTML = `<span class="material-icons">close</span>`;
        } else {
          document
            .querySelector(".answer__container")
            .classList.remove("shown");
          document.querySelector(".post__answer_button").innerText =
            "Write an answer!";
        }
      }
    );
  }

  submitAnswer(event) {
    event.preventDefault();
    if (this.state.answerText !== "") {
      let updatedAnswers = this.state.question.answers;
      updatedAnswers.push({
        id: this.state.question.answers.length,
        text: this.state.answerText,
        accepted: false,
      });
      this.setState(
        {
          question: {
            ...this.state.question,
            answers: updatedAnswers,
          },
          answerText: "",
        },
        () => this.props.editPost(this.state.question)
      );
      this.toggleAnswer();
    }
    if (this.state.answerText === "") {
      this.setState((_) => ({
        error: "Your answer seems to be empty, that does not answer anything!",
      }));
    }
  }

  renderAnswers() {
    const answers = this.props.question.answers.map((answer) => {
      return (
        <li className="post__answer" key={answer.id}>
          <h4>{answer.text}</h4>
          <div className="answer__accept">
            <span>Did this answer you question?</span>
            <input
              type="checkbox"
              value={answer.accepted}
              onChange={(_) => this.acceptAnswer(answer.id)}
            ></input>
          </div>
        </li>
      );
    });
    return <ul>{answers}</ul>;
  }

  render() {
    return (
      <>
        <li>
          <article className="questions__post">
            <h3>{this.state.question.title}</h3>
            <p>{this.state.question.question}</p>
            <div className="post__ratings">
              <div className="post__rating" onClick={this.upvote}>
                <span className="material-icons">thumb_up_alt</span>
                <span>{this.state.question.upvotes}</span>
              </div>
              <div className="post__rating" onClick={this.downvote}>
                <span className="material-icons">thumb_down_alt</span>
                <span>{this.state.question.downvotes}</span>
              </div>
            </div>
            <span className="post__answer_button" onClick={this.toggleAnswer}>
              Write an answer!
            </span>
            <form className="answer__container">
              <div className="answer__form">
                <input
                  name="answer"
                  value={this.state.answerText}
                  placeholder="What is your answer?"
                  onChange={this.answerChange}
                ></input>
                <input
                  type="submit"
                  onClick={this.submitAnswer}
                  value="Submit"
                ></input>
              </div>
              <span className="answer_error">{this.state.error}</span>
            </form>
            {this.renderAnswers()}
          </article>
        </li>
      </>
    );
  }
}
