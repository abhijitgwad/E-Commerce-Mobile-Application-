// import

import userModel from "../models/userModel.js";
import chatModel from "../models/chatmodel.js";
import messageModel from "../models/messageModel.js";

export const accesschat = async (req, res) => {
  const userId = req.params.id;
  // const myId = req.myId;

  const myId = "6671d57f89897ed9f31ae400";

  if (!userId) {
    res.status(500).send({
      success: false,
      message: "Require userId",
    });
  }

  var isChat = await chatModel
    .find({
      users: { $all: [userId, myId] },
    })
    .populate("users")
    .populate("latestMessage");

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "email",
  });
  console.log("second ", isChat);

  if (isChat.length > 0) {
    console.log("asfsdf");
    res.send(isChat[0]);
  } else {
    const chatdata = {
      chatName: "sender",
      users: [myId, userId],
    };
    try {
      const createChat = await new chatModel(chatdata).save();
      const Fullchat = await chatModel
        .findOne({ _id: createChat._id })
        .populate("users");
      res.status(200).send({
        success: true,
        message: "new chat created",
        Fullchat,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error while fetching chat",
      });
    }
  }
};

// export const fetchchat = async (req, res) => {
//   // const myId = req.myId;
//   console.log("abhijit this is woriking");
// };

export const fetchchat = async (req, res) => {
  // const myId = req.myId;

  const myId = req.params.id;

  try {
    var result = await chatModel
      .find({
        users: { $elemMatch: { $eq: myId } },
      })
      .populate("users")
      // .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .lean();

    result = await messageModel.populate(result, {
      path: "latestMessage",
    });

    res.status(200).send({
      success: true,
      message: "successfully fetched all chats",
      result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching all chats",
      error,
    });
  }
};

export const deleteController = async (req, res) => {
  const { chatId } = req.body;

  try {
    const result = await messageModel.deleteMany({ chats: chatId });

    res.status(200).send({
      success: true,
      message: "successfully deleted all chats",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting all chats",
      error,
    });
  }
};
