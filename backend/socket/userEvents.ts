import { Socket, Server as SocketIOServer } from "socket.io";
import User from "../modals/User";
import { generateToken } from "../utils/token";

export const userEvents = (io: SocketIOServer, socket: Socket) => {
  socket.on("testSocketEvent", (data) => {
    console.log("Received data from client:", data);
    socket.emit("testSocketEvent", {
      message: "Hello from the server",
    });
  });

  socket.on(
    "updateProfile",
    async (data: { name?: string; avatar?: string }) => {
      console.log("updateProfile:", data);

      const userId = socket.data.userId;
      if (!userId) {
        return socket.emit("updateProfile", {
          success: false,
          msg: "Unauthorized",
        });
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            name: data.name,
            avatar: data.avatar,
          },
          { new: true }
        ); // new: true is used to return the updated user

        if (!updatedUser) {
          return socket.emit("updateProfile", {
            success: false,
            msg: "User not found",
          });
        }

        //get token from updatedUser
        const newToken = await generateToken(updatedUser);

        //set token to cookie
        socket.data.token = newToken;

        // emit the updated user to the client
        socket.emit("updateProfile", {
          success: true,
          msg: "Profile updated successfully",
          user: updatedUser,
          data: { token: newToken },
        });
      } catch (error) {
        console.log("Error updating profile:", error);
        return socket.emit("updateProfile", {
          success: false,
          msg: "Internal server error",
        });
      }
    }
  );

  socket.on("getContacts", async () => {
    console.log("getContacts");

    try {
      const currentUserId = socket.data.userId;
      if (!currentUserId) {
        socket.emit("getContacts", {
          success: false,
          msg: "Unauthorized",
        });
        return;
      }

      const users = await User.find(
        { _id: { $ne: currentUserId } },
        { password: 0 } // exclude password from the response
      ).lean(); // lean() is used to return the data in a lean format

      const contacts = users.map((user) => ({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
      }));

      socket.emit("getContacts", {
        success: true,
        data: contacts,
      });
    } catch (error: any) {
      console.log("getContacts error:", error);
      return socket.emit("getContacts", {
        success: false,
        msg: "Failed to get contacts",
      });
    }
  });
};
