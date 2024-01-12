import { model, Schema } from "mongoose";

interface commentInterface {
  body: String;
  rating: Number;
  user: {
    type: Schema.Types.ObjectId;
    ref: "User";
  };
}

const commentSchema = new Schema<commentInterface>(
  {
    body: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = model<commentInterface>("Comment", commentSchema);

export default Comment;
