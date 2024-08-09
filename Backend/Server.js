import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import testrouter from "./routes/testroute.js";
import userrouter from "./routes/userRoute.js";
import productrouter from "./routes/productRoute.js";
import collegerouter from "./routes/collegeRoute.js";
import requestrouter from "./routes/requestCollegeRoute.js";
import chatrouter from "./routes/chatRoute.js";
import messagerouter from "./routes/messageRoute.js";

import { Server as SocketIOServer } from "socket.io";

//dot env config
dotenv.config();

//db connection
connectDB();

//rest object
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//route

app.use("/api/v1", testrouter);
app.use("/api/v1/user", userrouter);
app.use("/api/v1/product", productrouter);
app.use("/api/v1/college", collegerouter);
app.use("/api/v1/request", requestrouter);
app.use("/api/v1/chat", chatrouter);
app.use("/api/v1/message", messagerouter);

app.get("/", (req, res) => {
  return res.status(200).send("this is working");
});

//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running on ", PORT);
});

const io = new SocketIOServer(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://192.168.137.1:3000",
  },
});

io.on("connection", (socket) => {
  // console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    // console.log(userData);
    socket.join(userData?._id);
    console.log("connected to user id : ", userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joiner room", room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chats;

    if (!chat?.users) return console.log("chat.user not defined");

    chat?.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
