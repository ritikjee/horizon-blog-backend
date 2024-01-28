import { model, Schema, Types } from "mongoose";

interface commentInterface {
  body: String;

  user: {
    type: Types.ObjectId;
    ref: "User";
  };
  blog: {
    type: Types.ObjectId;
    ref: "Blog";
  };
}

const commentSchema = new Schema<commentInterface>(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

const Comment = model<commentInterface>("Comment", commentSchema);

export default Comment;
