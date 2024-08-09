import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import chatModel from "../models/chatmodel.js";

export const sendMessage = async (req, res) => {
  // const { content, chatId } = req.body;
  // const myId = req.myId;

  const { content, chatId, myId } = req.body;

  if (!content || !chatId) {
    res.status(500).send({
      success: false,
      message: "Pleaes provide Content, chatId",
    });
  }

  var newMessage = {
    sender: myId,
    content: content,
    chats: chatId,
  };

  try {
    var message = await new messageModel(newMessage).save();
    message = await message.populate("sender", "name pic");
    // console.log("first ", message);
    message = await message.populate("chats");
    // console.log("second ", message);

    message = await userModel.populate(message, {
      path: "chats.users",
      select: "name pic email",
    });

    await chatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    await res.status(200).send({
      success: true,
      message: "successfully sent the message",
      message,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in sending message",
      error,
    });
  }
};

export const allMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    var messages = await messageModel
      .find({ chats: chatId })
      .select("content sender");
    // messages = await messages.populate("chats");

    res.status(200).send({
      success: true,
      message: "successfully got all messages",
      messages,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in getting all messages",
      error,
    });
  }
};
