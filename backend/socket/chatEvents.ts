import { Socket, Server as SocketIoServer } from "socket.io";
import Conversation from "../modals/Conversation";

export function registerChatEvents(io: SocketIoServer, socket: Socket) {
  socket.on("newConversation", async (data) => {
    console.log("newConversation", data);
    try {
      if (data.type === "direct") {
        //check if the conversation already exists
        const existingConversation = await Conversation.findOne({
          participants: { $all: data.participants, $size: 2 },
          type: "direct",   
        })
          .populate({ path: "participants", select: "name email avatar" })
          .lean();
        if (existingConversation) {
          socket.emit("newConversation", {  
            success: true,
            data: { ...existingConversation, isNew: false },
          });
          return;
        }
      }
      //if the conversation does not exist, create a new one
      const newConversation = await Conversation.create({
        participants: data.participants,
        type: data.type,    
        name: data.name || "", // can be empty if direct conversation
        avatar: data.avatar || "",
        createdBy: socket.data.userId,
      });

      //get all connected sockets
      const connectedSockets = Array.from(io.sockets.sockets.values()).filter(
        (socket) => data.participants.includes(socket.data.userId)
      );

      //join this conversation by all online participants
      connectedSockets.forEach((socket) => {
        socket.join(newConversation._id.toString());
      });

      //send conversation data back to all online participants
      const populatedConversation = await Conversation.findById(
        newConversation._id
      )
        .populate({ path: "participants", select: "name email avatar" })
        .lean();
      if (!populatedConversation) {
        throw new Error("Failed to create conversation");
      }

      //emit conversations to all participants
      io.to(newConversation._id.toString()).emit("newConversation", {
        success: true,
        data: { ...populatedConversation, isNew: true },
      });
    } catch (error: any) {
      console.log("Error creating conversation:", error);
      socket.emit("newConversation", {  
        success: false,
        msg: "Failed to create conversation",
      });
    }
  });
}
