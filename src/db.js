import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: String,
  question: String,
  upvotes: Number,
  downvotes: Number,
  answers: Array,
});

export const Question = mongoose.model("Question", questionSchema);
