import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Socket, Server as SocketIOServer } from "socket.io";
import Conversation from "../modals/Conversation";
import { registerChatEvents } from "./chatEvents";
import { userEvents } from "./userEvents";

dotenv.config();

export function initializeSocket(server: any): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", //allow all origins
    },
  });

  //middleware to authenticate the socket
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }
    //verify the token
    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return next(new Error("invalid token"));
        }
        //attach user to socket data
        socket.data.userId = decoded.user.id;
        next();
      }
    );
  });

  //when a socket connects ,register the user events

  io.on("connection", async (socket: Socket) => {
    const userId = socket.data.userId;
    console.log("A user connected", userId);

    //register the user events
    userEvents(io, socket);
    registerChatEvents(io, socket);

    //join all the conversations of the user is part of
    try {
      const conversations = await Conversation.find({
        participants: userId,
      }).select("_id");
      conversations.forEach((conversation: any) => {
        socket.join(conversation._id.toString());
      });
    } catch (error: any) {
      console.log("Error joining conversations", error);
    }

    //send welcome message
    socket.emit("welcome", "Welcome to the chat");
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}
