import { Schema, Types, model } from "mongoose";

interface topicInterface {
  name: String;
  description: String;
  coverImage: String;
  blogs: [
    {
      type: Types.ObjectId;
      ref: "Blog";
    }
  ];
  followers: [
    {
      type: Types.ObjectId;
      ref: "User";
    }
  ];
}

const userSchema = new Schema<topicInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
      default: "https://picsum.photos/200/300",
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Topic = model<topicInterface>("Topic", userSchema);

export default Topic;
