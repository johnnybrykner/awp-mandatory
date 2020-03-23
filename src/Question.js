import React from "react";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
    };

    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
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
          </article>
        </li>
      </>
    );
  }
}
