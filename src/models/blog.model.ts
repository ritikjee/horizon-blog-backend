import { Schema, model } from "mongoose";

interface blogInterface {
  title: String;
  slug: String;
  description: String;
  body: String;
  coverImage: String;
  author: {
    type: Schema.Types.ObjectId;
    ref: "User";
  };
  comments: [
    {
      type: Schema.Types.ObjectId;
      ref: "Comment";
    }
  ];

  likes: [
    {
      type: Schema.Types.ObjectId;
      ref: "User";
    }
  ];
  dislikes: [
    {
      type: Schema.Types.ObjectId;
      ref: "User";
    }
  ];

  topics: [
    {
      type: Schema.Types.ObjectId;
      ref: "Topic";
    }
  ];
}

const blogSchema = new Schema<blogInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "https://picsum.photos/200/300",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
  { timestamps: true }
);

const Blog = model<blogInterface>("Blog", blogSchema);

export default Blog;
