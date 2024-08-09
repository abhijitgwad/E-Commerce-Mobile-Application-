import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatname: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chats", chatSchema);

export default chatModel;
